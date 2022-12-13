import { useQuery } from "react-query";

import TransactionService from "../services/transaction";
import { Transaction } from "../types/Transaction";

const transactionService = new TransactionService();

export default function useTransactions(initialData?: Transaction[]) {
  const $transactions = useQuery(
    ["TRANSACTIONS_LIST"],
    async () => {
      const { results } = await transactionService.list({ limit: 5 });
      return results;
    },
    {
      initialData,
    }
  );

  return $transactions;
}
