import { useQuery } from "react-query";

import AccountService from "../services/account";

const accountService = new AccountService();

export default function useAccountBalance(initialData?: number) {
  const $accountBalance = useQuery(
    ["ACCOUNT_BALANCE"],
    async () => {
      const account = await accountService.retrieve();
      return account.balance;
    },
    {
      initialData,
    }
  );

  return $accountBalance;
}
