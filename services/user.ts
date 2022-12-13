import { myBankApiHttpClient } from "../lib/http-client";
import { PageReqContext } from "../lib/user-storage";
import { User, UserResult } from "../types/User";
import BaseService from "./base";

interface SignInBody {
  username: string;
  password: string;
}

class UserService extends BaseService {
  constructor(ctx: PageReqContext = undefined) {
    super(myBankApiHttpClient, ctx);
  }

  list = () => {
    return this.authRequest<{ results: UserResult[] }>({
      method: "GET",
      path: "/users",
    });
  };

  signIn = async ({ username, password }: SignInBody) => {
    const { user } = await this.request<{ user: User }>({
      method: "POST",
      path: "/token",
      body: {
        username,
        password,
      },
    });

    return user;
  };
}

export default UserService;
