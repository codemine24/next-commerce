/* eslint-disable @typescript-eslint/no-unused-vars */
import Cookies from "js-cookie";

import CONFIG from "@/config";
import {
  RequestOptions,
  HttpMethod,
  FetchApi,
  ApiResponse,
} from "@/interfaces/api";

import { API_ROUTES } from "./api-routes";

class ApiClient {
  private baseURL: string;
  get: <T = any>(
    url: string,
    options?: RequestOptions
  ) => Promise<ApiResponse<T>>;
  post: <T = any>(
    url: string,
    options?: RequestOptions
  ) => Promise<ApiResponse<T>>;
  put: <T = any>(
    url: string,
    options?: RequestOptions
  ) => Promise<ApiResponse<T>>;
  delete: <T = any>(
    url: string,
    options?: RequestOptions
  ) => Promise<ApiResponse<T>>;
  patch: <T = any>(
    url: string,
    options?: RequestOptions
  ) => Promise<ApiResponse<T>>;

  constructor(baseURL: string = CONFIG.base_url) {
    this.baseURL = baseURL;
    this.get = this.createMethod("GET");
    this.post = this.createMethod("POST");
    this.put = this.createMethod("PUT");
    this.delete = this.createMethod("DELETE");
    this.patch = this.createMethod("PATCH");
  }

  createMethod(method: HttpMethod) {
    return <T = any>(url: string, options: RequestOptions = {}) =>
      this.request<T>(url, { ...options, method });
  }

  async request<T = any>(
    url: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    if (typeof window === "undefined") {
      return this.serverRequest(url, options);
    } else {
      return this.clientRequest(url, options);
    }
  }

  // Server side API request
  private async serverRequest(url: string, options: RequestOptions) {
    try {
      const accessToken = await this.getTokenFromServer("access_token");
      let response = await this.makeRequest(url, accessToken, options);

      if (response.status === 401) {
        const newAccessToken = await this.refreshTokenOnServer();
        if (newAccessToken) {
          response = await this.makeRequest(url, newAccessToken, options);
        }
      }

      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Client side API request
  private async clientRequest(url: string, options: RequestOptions) {
    try {
      const accessToken = this.getTokenFromClient("access_token");
      let response = await this.makeRequest(url, accessToken, options);

      if (response.status === 401) {
        const newAccessToken = await this.refreshTokenOnClient();
        if (newAccessToken) {
          response = await this.makeRequest(url, newAccessToken, options);
        }
      }

      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Make Actual API request Here
  private async makeRequest(
    url: string,
    token: string | null,
    options: RequestOptions
  ): Promise<Response> {
    const cacheStrategy =
      options.method === "GET" ? options.cache || "force-cache" : undefined;

    // Convert headers to object
    const headers = this.convertHeadersToObject(options.headers);

    // Set Authorization header if token is present
    if (token) headers["Authorization"] = `Bearer ${token}`;

    // Handle Content-Type based on body type
    const isFormData = options.body instanceof FormData;

    if (isFormData) {
      // DON'T set Content-Type for FormData
      delete headers["Content-Type"];
    } else if (options.body && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    const controller = new AbortController();
    const timeout = options.timeout ?? 10000; // Default timeout is 10 seconds
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const fetchOptions: RequestInit = {
      method: options.method,
      headers,
      ...(options.body !== undefined && { body: options.body }),
      ...(cacheStrategy && { cache: cacheStrategy }),
      ...(options.credentials && { credentials: options.credentials }),
      ...(options.redirect && { redirect: options.redirect }),
      ...(options.referrer && { referrer: options.referrer }),
      ...(options.next && { next: options.next }),
      signal: controller.signal,
    };

    try {
      return await fetch(`${this.baseURL}${url}`, fetchOptions);
    } finally {
      clearTimeout(timeoutId); // Clear the timeout when request completes
    }
  }

  // Server side refresh token
  private async refreshTokenOnServer(): Promise<string | null> {
    const refreshToken = await this.getTokenFromServer("refresh_token");

    if (!refreshToken) return null;

    try {
      const response = await fetch(
        `${CONFIG.base_url}/${API_ROUTES.auth.refresh_token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      if (!response.ok) return null;

      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      return null;
    }
  }

  // Client side refresh token
  private async refreshTokenOnClient(): Promise<string | null> {
    const refreshToken = this.getTokenFromClient("refresh_token");

    if (!refreshToken) return null;

    try {
      const response = await fetch(
        `${CONFIG.base_url}/${API_ROUTES.auth.refresh_token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      if (!response.ok) return null;

      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      return null;
    }
  }

  // Server side get token
  private async getTokenFromServer(name: string): Promise<string | null> {
    if (typeof window !== "undefined") return null;

    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const token = cookieStore.get(name);
      return token?.value || null;
    } catch {
      return null;
    }
  }

  // Client side get token
  private getTokenFromClient(name: string): string | null {
    if (typeof window === "undefined") return null;
    return Cookies.get(name) || null;
  }

  // Helper to convert any HeadersInit to plain object
  private convertHeadersToObject(
    headersInit?: HeadersInit
  ): Record<string, string> {
    if (!headersInit) return {};

    const headers: Record<string, string> = {};

    if (headersInit instanceof Headers) {
      headersInit.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(headersInit)) {
      headersInit.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      Object.assign(headers, headersInit);
    }

    return headers;
  }

  // Handle response
  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      const errorMessage =
        (error as { message?: string }).message ||
        response.statusText ||
        "Unknown error";

      return {
        success: false,
        statusCode: response.status,
        message: errorMessage,
        data: null,
      };
    }

    const data = await response.json();
    return data;
  }

  // Handle error
  private handleError(error: unknown) {
    let errorMessage = "Network error";

    if (error instanceof DOMException && error.name === "AbortError") {
      errorMessage = "Request timed out";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      statusCode: 500,
      message: errorMessage,
      data: null,
    };
  }
}

const api: FetchApi = new ApiClient();
export default api;
