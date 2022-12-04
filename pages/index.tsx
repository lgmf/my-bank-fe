import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";

import ProgressButton from "../components/ProgressButton";
import UsersDataGrid from "../components/UsersDataGrid";
import useSnackbar from "../context/SnackbarContext";
import useAccountBalance from "../hook/useAccountBalance";
import useTransferMutation from "../hook/useTransferMutation";
import PrivateLayout from "../layout/PrivateLayout";
import accountService from "../services/account";
import userService from "../services/user";
import { User, UserResult } from "../types/User";
import { ensureAuth } from "../utils/ensureAuth";

interface HomeProps {
  authenticatedUser: User;
  accountBalance: number;
  users: UserResult[];
}

export default function Home({
  accountBalance,
  authenticatedUser,
  users,
}: HomeProps) {
  const snackbar = useSnackbar();

  const $accountBalance = useAccountBalance(
    authenticatedUser.token,
    accountBalance
  );

  const transferMutation = useTransferMutation({
    onSuccess: () => {
      snackbar.success("Transfer succeeded!");
      $accountBalance.refetch();
    },
    onError: () => {
      snackbar.error("Failed to complete the transfer. Try again later");
    },
  });

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const balance = $accountBalance.data || accountBalance;

  const isTransferButtonDisabled =
    !selectedUserId || amount <= 0 || amount > balance;

  function handleTransfer() {
    transferMutation.mutate({
      amount,
      recipientUserId: selectedUserId,
      token: authenticatedUser.token,
    });
  }

  return (
    <PrivateLayout pageTitle="Home">
      <Box display="flex" flexDirection="column" gap={4}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h4">
              Hello, {authenticatedUser.name}
            </Typography>

            <Typography variant="body2">
              Your balance is, <strong>R$ {balance}</strong>
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ height: 400, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginBottom: 2,
            }}
          >
            <TextField
              label="Amount"
              type="number"
              inputProps={{
                min: 0,
              }}
              value={amount}
              onChange={(event) => {
                const next = Number(event.target.value);
                setAmount(Number.isNaN(next) ? 0 : next);
              }}
            />

            <ProgressButton
              disabled={isTransferButtonDisabled}
              variant="contained"
              color="success"
              loading={transferMutation.isLoading}
              onClick={handleTransfer}
            >
              Transfer
            </ProgressButton>
          </Box>

          <UsersDataGrid
            users={users.filter((user) => user.id !== authenticatedUser.id)}
            selectedUserId={selectedUserId}
            onSelectionChange={(next) => {
              setSelectedUserId(next);
            }}
          />
        </Box>
      </Box>
    </PrivateLayout>
  );
}

export const getServerSideProps = ensureAuth(async ({ user }) => {
  const [{ account }, { results: users }] = await Promise.all([
    accountService.retrieve(user.token),
    userService.list(user.token),
  ]);

  return {
    props: {
      authenticatedUser: user,
      accountBalance: account.balance,
      users,
    },
  };
});
