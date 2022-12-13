import { List } from "@mui/material";

import { useAuth } from "../../context/AuthContext";
import useTransactions from "../../hooks/useTransactions";
import TransactionListItem from "./TransactionListItem";
import TransactionListItemSkeleton from "./TransactionListItemSkeleton";

function TransactionListSkeleton() {
  return (
    <List sx={{ width: "100%" }}>
      <TransactionListItemSkeleton />
      <TransactionListItemSkeleton />
      <TransactionListItemSkeleton />
      <TransactionListItemSkeleton />
      <TransactionListItemSkeleton />
    </List>
  );
}

export default function TransactionList() {
  const { user } = useAuth();
  const $transactions = useTransactions();

  if (!user) {
    return null;
  }

  const transactions = $transactions.data;

  return (
    <List sx={{ width: "100%" }}>
      {transactions ? (
        transactions.map((transaction) => (
          <TransactionListItem
            key={transaction.id}
            authenticatedUserId={user.id}
            transaction={transaction}
          />
        ))
      ) : (
        <TransactionListItemSkeleton />
      )}
    </List>
  );
}
