type Methods = "GET" | "POST";

export interface RequestConfig<B> {
  method: Methods;
  path: string;
  headers?: Record<string, string>;
  body?: B;
}

export interface HttpClientProps {
  baseUrl?: string;
}

export interface HttpClient {
  request: <R, B = unknown>(config: RequestConfig<B>) => Promise<R>;
}
