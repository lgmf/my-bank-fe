export type TransactionTypes = "deposit" | "withdraw" | "transfer";

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionTypes;
  createdAt: string;
  sender: {
    id: string;
    name: string;
  };
  recipient: {
    id: string;
    name: string;
  };
}
