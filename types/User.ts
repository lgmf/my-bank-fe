import { Account } from "./Account";

export interface User {
  id: string;
  username: string;
  name: string;
  token: string;
}

export interface UserResult extends Omit<User, "token"> {
  account: Omit<Account, "username">;
}
