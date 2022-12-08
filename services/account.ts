import { Account } from "../types/Account";
import BaseService from "./base";

class AccountService extends BaseService {
  retrieve = async () => {
    const { account } = await this.authRequest<{ account: Account }>({
      method: "GET",
      path: "/accounts",
    });

    return account;
  };
}

export default AccountService;
