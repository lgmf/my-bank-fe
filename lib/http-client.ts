import axios, { AxiosInstance } from "axios";

type Methods = "GET" | "POST";

interface RequestConfig<B> {
  method: Methods;
  path: string;
  headers?: Record<string, string>;
  body?: B;
}

class HttpClient {
  private static makeAuthorizationHeader(token?: string) {
    if (!token) {
      return undefined;
    }

    return { Authorization: `Bearer ${token}` };
  }

  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:7000",
    });
  }

  private async request<R, B = unknown>({
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

  get<R>(path: string, token?: string) {
    return this.request<R>({
      method: "GET",
      path,
      headers: HttpClient.makeAuthorizationHeader(token),
    });
  }

  post<R, B = unknown>(path: string, body?: B, token?: string) {
    return this.request<R, B>({
      method: "POST",
      path,
      body,
      headers: HttpClient.makeAuthorizationHeader(token),
    });
  }
}

export default new HttpClient();
