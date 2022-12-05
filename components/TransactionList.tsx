import { Add, ArrowDownward, ArrowUpward, Remove } from "@mui/icons-material";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
} from "@mui/material";
import dateLib from "../lib/date";
import { Transaction } from "../types/Transaction";

type TransactionAvatarTypes =
  | "deposit"
  | "withdraw"
  | "transferSend"
  | "transferReceived";

interface TransactionAvatarProps {
  type: TransactionAvatarTypes;
}

interface TransactionListProps {
  authenticatedUserId: string;
  transactions: Transaction[];
}

const transactionIconByAvatarType: Record<TransactionAvatarTypes, JSX.Element> =
  {
    deposit: <Add />,
    withdraw: <Remove />,
    transferReceived: <ArrowDownward />,
    transferSend: <ArrowUpward />,
  };

function TransactionListAvatar({ type }: TransactionAvatarProps) {
  const theme = useTheme();
  const icon = transactionIconByAvatarType[type];

  return (
    <ListItemAvatar>
      <Avatar sx={{ backgroundColor: theme.palette.grey[100] }}>{icon}</Avatar>
    </ListItemAvatar>
  );
}

export default function TransactionList({
  authenticatedUserId,
  transactions,
}: TransactionListProps) {
  const theme = useTheme();

  return (
    <List sx={{ width: "100%" }}>
      {transactions.map(
        ({ id, type, amount, sender, recipient, createdAt }) => {
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
              amountColor = theme.palette.success.main;
            } else {
              recipientName = `From ${sender.name}`;
              amountColor = theme.palette.error.main;
            }
          } else if (type === "withdraw") {
            recipientName = "From your account";
            amountColor = theme.palette.error.main;
          } else {
            recipientName = "To your account";
            amountColor = theme.palette.success.main;
          }

          return (
            <ListItem key={id}>
              <TransactionListAvatar type={avatarType} />

              <ListItemText primary={recipientName} secondary={date} />

              <ListItemText
                sx={{ textAlign: "end", color: amountColor }}
                primary={amountFormatted}
              />
            </ListItem>
          );
        }
      )}
    </List>
  );
}
