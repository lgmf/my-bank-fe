import httpClient from "../lib/http-client";
import { Account } from "../types/Account";

function retrieve(token: string) {
  return httpClient.get<{ account: Account }>("/accounts", token);
}

const accountService = {
  retrieve,
};

export default accountService;
