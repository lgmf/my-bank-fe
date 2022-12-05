import httpClient from "../lib/http-client";
import { Transaction } from "../types/Transaction";

interface TransferBody {
  token: string;
  recipientUserId: string;
  amount: number;
}

function transfer({ amount, recipientUserId, token }: TransferBody) {
  return httpClient.post<void>(
    "/transactions/transfer",
    {
      amount,
      recipientUserId,
    },
    token
  );
}

function list(token: string) {
  return httpClient.get<{ results: Transaction[] }>("/transactions", token);
}

const transactionService = {
  transfer,
  list,
};

export default transactionService;
