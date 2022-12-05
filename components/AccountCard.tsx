import { Box, Paper, Typography, useTheme } from "@mui/material";
import Image from "next/image";

import brlFlag from "../assets/brl-flag.svg";

interface AccountCardProps {
  balance: number;
}

export default function AccountCard({ balance }: AccountCardProps) {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        width: 208,
        height: 208,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: theme.palette.grey[50],

        "& > img": {
          borderRadius: "50%",
        },
      }}
    >
      <Image src={brlFlag} width={50} height={50} alt="" />

      <footer>
        <Typography variant="h5" fontWeight="bold">
          R$ {balance}
        </Typography>

        <Typography variant="caption">Brazilian real</Typography>
      </footer>
    </Paper>
  );
}
