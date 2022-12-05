import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";

interface PageTitleProps {
  title: string;
  right?: ReactNode;
}

export default function PageTitle({ title, right }: PageTitleProps) {
  return (
    <Box display="flex" justifyContent="space-between" marginBottom={3}>
      <Typography variant="h4">{title}</Typography>

      {right}
    </Box>
  );
}
