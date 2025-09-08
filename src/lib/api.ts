/* eslint-disable @typescript-eslint/no-unused-vars */
import CONFIG from "@/config";
import { FetchError, RequestOptions, HttpMethod, FetchApi } from "@/interfaces/api";

class ApiClient {
    private baseURL: string;
    get: <T = any>(url: string, options?: RequestOptions) => Promise<T | FetchError>;
    post: <T = any>(url: string, options?: RequestOptions) => Promise<T | FetchError>;
    put: <T = any>(url: string, options?: RequestOptions) => Promise<T | FetchError>;
    delete: <T = any>(url: string, options?: RequestOptions) => Promise<T | FetchError>;
    patch: <T = any>(url: string, options?: RequestOptions) => Promise<T | FetchError>;

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
    ): Promise<T | FetchError> {
        if (typeof window === "undefined") {
            return this.serverRequest(url, options);
        } else {
            return this.clientRequest(url, options);
        }
    }

    // Server side API request
    private async serverRequest(
        url: string,
        options: RequestOptions
    ) {
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
    private async clientRequest(
        url: string,
        options: RequestOptions
    ) {
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
            options.method === "GET" ? options.cache || "force-cache" : "no-store";

        const headers = this.convertHeadersToObject(options.headers);
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Handle Content-Type based on body type
        const isFormData = options.body instanceof FormData;

        if (isFormData) {
            // DON'T set Content-Type for FormData
            delete headers['Content-Type'];
        } else if (options.body && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        const fetchOptions: RequestInit = {
            method: options.method,
            headers,
            body: options.body,
            cache: cacheStrategy,
            credentials: options.credentials,
            redirect: options.redirect,
            referrer: options.referrer,
            signal: options.signal,
            next: options.next,
        };

        return fetch(`${this.baseURL}${url}`, fetchOptions);
    }

    // Server side refresh token
    private async refreshTokenOnServer(): Promise<string | null> {
        const refreshToken = await this.getTokenFromServer("refresh_token");

        if (!refreshToken) return null;

        try {
            const response = await fetch(`${CONFIG.base_url}/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            if (!response.ok) return null;

            const data = await response.json();
            await this.setTokenOnServer(data.accessToken, "access_token");
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
            const response = await fetch(`${CONFIG.base_url}/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            if (!response.ok) return null;

            const data = await response.json();
            this.setTokenOnClient("access_token", data.accessToken);
            return data.accessToken;
        } catch (error) {
            return null;
        }
    }

    // Server side get token
    private async getTokenFromServer(name: string): Promise<string | null> {
        if (typeof window !== "undefined") return null;

        try {
            const { cookies } = await import('next/headers');
            const cookieStore = await cookies();
            const token = cookieStore.get(name);
            return token?.value || null;
        } catch {
            return null;
        }
    }

    // Server side set token
    private async setTokenOnServer(accessToken: string, name: string): Promise<void> {
        try {
            const { cookies } = await import('next/headers');
            const cookieStore = await cookies();
            cookieStore.set({
                name: name,
                value: accessToken,
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 12,
            });
        } catch (error) {
            console.error("Error setting access token:", error);
        }
    };

    // Client side get token
    private getTokenFromClient(name: string): string | null {
        if (typeof window === "undefined") return null;

        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()!.split(";").shift() || null;
        return null;
    }

    // Client side set token
    private setTokenOnClient(name: string, value: string): void {
        if (typeof window === "undefined") return;

        document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 12
            }; secure; samesite=none`;
    }

    // Helper to convert any HeadersInit to plain object
    private convertHeadersToObject(headersInit?: HeadersInit): Record<string, string> {
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
        const errorMessage =
            error instanceof Error ? error.message : "Network error";

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