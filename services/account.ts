import { myBankApiHttpClient } from "../lib/http-client";
import { PageReqContext } from "../lib/user-storage";
import { Account } from "../types/Account";
import BaseService from "./base";

class AccountService extends BaseService {
  constructor(ctx: PageReqContext = undefined) {
    super(myBankApiHttpClient, ctx);
  }

  retrieve = async () => {
    const { account } = await this.authRequest<{ account: Account }>({
      method: "GET",
      path: "/accounts",
    });

    return account;
  };
}

export default AccountService;
