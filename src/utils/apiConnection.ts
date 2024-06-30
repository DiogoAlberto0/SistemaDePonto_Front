type HTTPMethods = | "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "CONNECT" | "TRACE"

export interface ApiResponse<T> {
    status: number;
    statusText: string;
    data: T | undefined;
    error: any | undefined;
}
export class ApiConnection {

    private apiUrl: string
    private readonly defaultHeaders: HeadersInit

    constructor(apiUrl: string, defaultHeaders: HeadersInit) {
        this.apiUrl = apiUrl
        this.defaultHeaders = defaultHeaders
    }

    private async request<ResponseType = any>(
        route: string,
        method: HTTPMethods,
        headers: HeadersInit,
        body: BodyInit | null = null,
        cache: RequestCache = 'no-store'
    ): Promise<ApiResponse<ResponseType>> {
        try {

            const response = await fetch(`${this.apiUrl}${route}`, {
                method,
                headers: {
                    ...headers,
                    ...this.defaultHeaders
                },
                body,
                cache,
            })

            const data = await response.json()

            return {
                status: response.status,
                statusText: response.statusText,
                data: response.ok ? data : undefined,
                error: response.ok ? undefined : data
            }

        } catch (error) {
            return {
                status: 500,
                statusText: 'Internal server error',
                data: undefined,
                error
            }
        }
    }

    async get<ResponseType>(route: string, headers: HeadersInit = {}, cache?: RequestCache): Promise<ApiResponse<ResponseType>> {
        return this.request<ResponseType>(route, 'GET', headers, null, cache)
    }

    async post<ResponseType, BodyType>(route: string, body: BodyType, headers: HeadersInit = {}): Promise<ApiResponse<ResponseType>> {
        return this.request<ResponseType>(route, 'POST', headers, JSON.stringify(body));
    }

    async put<ResponseType, BodyType>(route: string, body: BodyType, headers: HeadersInit = {}): Promise<ApiResponse<ResponseType>> {
        return this.request<ResponseType>(route, 'PUT', headers, JSON.stringify(body));
    }

    async delete<ResponseType>(route: string, headers: HeadersInit = {}): Promise<ApiResponse<ResponseType>> {
        return this.request<ResponseType>(route, 'DELETE', headers);
    }
}