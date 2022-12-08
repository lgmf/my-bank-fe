import axios, { AxiosInstance } from "axios";

type Methods = "GET" | "POST";

export interface RequestConfig<B> {
  method: Methods;
  path: string;
  headers?: Record<string, string>;
  body?: B;
}

class HttpClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
  }

  async request<R, B = unknown>({
    method,
    path,
    body,
    headers,
  }: RequestConfig<B>): Promise<R> {
    const res = await this.client.request<R>({
      method,
      url: path,
      data: body,
      headers,
    });

    return res.data;
  }

  get<R>(config: Omit<RequestConfig<never>, "method" | "body">) {
    return this.request<R>({ ...config, method: "GET" });
  }

  post<R, B = unknown>(config: Omit<RequestConfig<B>, "method">) {
    return this.request<R, B>({ ...config, method: "POST" });
  }
}

export default new HttpClient();
