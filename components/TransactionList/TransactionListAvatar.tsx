import { Add, ArrowDownward, ArrowUpward, Remove } from "@mui/icons-material";
import { Avatar, ListItemAvatar, useTheme } from "@mui/material";

export type TransactionAvatarTypes =
  | "deposit"
  | "withdraw"
  | "transferSend"
  | "transferReceived";

interface TransactionAvatarProps {
  type: TransactionAvatarTypes;
}

const transactionIconByAvatarType: Record<TransactionAvatarTypes, JSX.Element> =
  {
    deposit: <Add />,
    withdraw: <Remove />,
    transferReceived: <ArrowDownward />,
    transferSend: <ArrowUpward />,
  };

export default function TransactionListAvatar({
  type,
}: TransactionAvatarProps) {
  const theme = useTheme();
  const icon = transactionIconByAvatarType[type];

  return (
    <ListItemAvatar>
      <Avatar sx={{ backgroundColor: theme.palette.grey[100] }}>{icon}</Avatar>
    </ListItemAvatar>
  );
}
