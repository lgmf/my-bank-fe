import httpClient from "../lib/http-client";

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

const transactionService = {
  transfer,
};

export default transactionService;
