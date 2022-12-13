import { ListItem, ListItemText, useTheme } from "@mui/material";

import dateLib from "../../lib/date";
import { Transaction } from "../../types/Transaction";
import TransactionListAvatar, {
  TransactionAvatarTypes,
} from "./TransactionListAvatar";

interface TransactionListItemProps {
  authenticatedUserId: string;
  transaction: Transaction;
}

export default function TransactionListItem({
  authenticatedUserId,
  transaction,
}: TransactionListItemProps) {
  const theme = useTheme();

  const { id, type, amount, sender, recipient, createdAt } = transaction;

  const amountFormatted = `R$ ${Math.abs(amount)}`;

  const date = dateLib.formatLongLocalizedDateTime(new Date(createdAt));

  let avatarType: TransactionAvatarTypes;
  let recipientName: string;
  let amountColor: string;

  if (type !== "transfer") {
    avatarType = type;
  } else if (sender.id === authenticatedUserId) {
    avatarType = "transferSend";
  } else {
    avatarType = "transferReceived";
  }

  if (type === "transfer") {
    if (sender.id === authenticatedUserId) {
      recipientName = `To ${recipient.name}`;
      amountColor = theme.palette.error.main;
    } else {
      recipientName = `From ${sender.name}`;
      amountColor = theme.palette.success.main;
    }
  } else if (type === "withdraw") {
    recipientName = "From your account";
    amountColor = theme.palette.error.main;
  } else {
    recipientName = "To your account";
    amountColor = theme.palette.success.main;
  }

  return (
    <ListItem>
      <TransactionListAvatar type={avatarType} />

      <ListItemText primary={recipientName} secondary={date} />

      <ListItemText
        sx={{ textAlign: "end", color: amountColor }}
        primary={amountFormatted}
      />
    </ListItem>
  );
}
