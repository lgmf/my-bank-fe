import { ListItem, ListItemText, Skeleton } from "@mui/material";

export default function TransactionListItemSkeleton() {
  return (
    <ListItem>
      <Skeleton />

      <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />

      <ListItemText primary={<Skeleton />} />
    </ListItem>
  );
}
