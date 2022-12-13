import { myBankApiHttpClient } from "../lib/http-client";
import { PageReqContext } from "../lib/user-storage";
import { Search, SearchProps } from "../types/Api";
import { Transaction } from "../types/Transaction";
import BaseService from "./base";

interface TransferBody {
  recipientUserId: string;
  amount: number;
}

class TransactionService extends BaseService {
  constructor(ctx: PageReqContext = undefined) {
    super(myBankApiHttpClient, ctx);
  }

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
