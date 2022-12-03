import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7000",
});

type Methods = "GET" | "POST";

class HttpClient {
  private async request<R, B = unknown>(
    method: Methods,
    path: string,
    body?: B
  ): Promise<R> {
    const res = await instance.request<R>({
      method,
      url: path,
      data: body,
    });

    return res.data;
  }

  get(path: string) {
    return this.request("GET", path);
  }

  post<R, B = unknown>(path: string, body?: B) {
    return this.request<R, B>("POST", path, body);
  }
}

export default new HttpClient();
