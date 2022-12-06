import { List } from "@mui/material";

import { Transaction } from "../../types/Transaction";
import TransactionListItem from "./TransactionListItem";

interface TransactionListProps {
  authenticatedUserId: string;
  transactions: Transaction[];
}

export default function TransactionList({
  authenticatedUserId,
  transactions,
}: TransactionListProps) {
  return (
    <List sx={{ width: "100%" }}>
      {transactions.map((transaction) => (
        <TransactionListItem
          key={transaction.id}
          authenticatedUserId={authenticatedUserId}
          transaction={transaction}
        />
      ))}
    </List>
  );
}
