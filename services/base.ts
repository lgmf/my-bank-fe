import { types } from "../lib/http-client";
import UserStorage, { PageReqContext } from "../lib/user-storage";

class BaseService {
  private readonly ctx: PageReqContext;

  constructor(
    private httpClient: types.HttpClient,
    ctx: PageReqContext = undefined
  ) {
    this.ctx = ctx;
  }

  private get token() {
    const user = UserStorage.getItem(this.ctx);

    if (!user) {
      return;
    }

    return user.token;
  }

  request = <R, B = unknown>(config: types.RequestConfig<B>) => {
    return this.httpClient.request<R, B>(config);
  };

  authRequest = <R, B = unknown>(config: types.RequestConfig<B>) => {
    if (!this.token) {
      throw new Error("token not found");
    }

    return this.httpClient.request<R>({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${this.token}`,
      },
    });
  };
}

export default BaseService;
