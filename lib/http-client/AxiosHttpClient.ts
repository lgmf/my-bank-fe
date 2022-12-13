import axios, { AxiosInstance } from "axios";
import { HttpClient, HttpClientProps, RequestConfig } from "./types";

class AxiosHttpClient implements HttpClient {
  private readonly client: AxiosInstance;

  constructor(props?: HttpClientProps) {
    this.client = axios.create({ baseURL: props?.baseUrl });
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
}

export default AxiosHttpClient;
