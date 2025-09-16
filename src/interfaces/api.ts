export interface RequestOptions extends RequestInit {
    cache?: RequestCache;
    next?: {
        revalidate?: number | false;
        tags?: string[];
    };
    body?: any;
    timeout?: number;
}

// ApiResponse
export type ApiResponse<T> = {
    success: true;
    data: T;
    statusCode: number;
    message: string;
} | {
    success: false;
    statusCode: number;
    message: string;
    data: null;
};


export interface BaseRequestOptions {
    headers?: HeadersInit;
    credentials?: RequestCredentials;
    redirect?: RequestRedirect;
    referrer?: string;
    timeout?: number;
    next?: NextFetchRequestConfig;
}

export type FetchMethod<ExtraOptions = Record<string, never>> = <T = any>(
    url: string,
    options?: BaseRequestOptions & ExtraOptions
) => Promise<ApiResponse<T>>;

export interface FetchApi {
    request: FetchMethod;
    get: FetchMethod<{ cache?: RequestCache }>;
    post: FetchMethod<{ body: BodyInit | null }>;
    put: FetchMethod<{ body: BodyInit | null }>;
    delete: FetchMethod<{ body: BodyInit | null }>;
    patch: FetchMethod<{ body: BodyInit | null }>;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';