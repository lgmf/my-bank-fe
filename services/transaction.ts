import { Search, SearchProps } from "../types/Api";
import { Transaction } from "../types/Transaction";
import BaseService from "./base";

interface TransferBody {
  recipientUserId: string;
  amount: number;
}

class TransactionService extends BaseService {
  transfer = ({ amount, recipientUserId }: TransferBody) => {
    return this.authRequest<void>({
      method: "POST",
      path: "/transactions/transfer",
      body: {
        amount,
        recipientUserId,
      },
    });
  };

  list = (searchProps: SearchProps) => {
    const search = new Search(searchProps);
    const queryParams = search.toQueryParams();

    return this.authRequest<{ results: Transaction[] }>({
      method: "GET",
      path: `/transactions?${queryParams}`,
    });
  };
}

export default TransactionService;
