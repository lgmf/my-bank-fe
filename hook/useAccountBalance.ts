import { useQuery } from "react-query";

import accountService from "../services/account";

export default function useAccountBalance(token: string, initialData?: number) {
  const $accountBalance = useQuery(
    ["ACCOUNT_BALANCE"],
    async () => {
      const { account } = await accountService.retrieve(token);
      return account.balance;
    },
    {
      initialData,
    }
  );

  return $accountBalance;
}
