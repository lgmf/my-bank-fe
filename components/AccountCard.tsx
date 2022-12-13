import { Paper, Skeleton, Typography, useTheme } from "@mui/material";
import Image from "next/image";

import brlFlag from "../assets/brl-flag.svg";
import useAccountBalance from "../hooks/useAccountBalance";

export default function AccountCard() {
  const theme = useTheme();
  const $accountBalance = useAccountBalance();

  const balance = $accountBalance.data;

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
          {balance !== undefined ? (
            `R$ ${balance}`
          ) : (
            <Skeleton animation="wave" />
          )}
        </Typography>

        <Typography variant="caption">Brazilian real</Typography>
      </footer>
    </Paper>
  );
}
