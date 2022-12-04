import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useMutation } from "react-query";

import ProgressButton from "../components/ProgressButton";
import useSnackbar from "../context/SnackbarContext";
import useRefreshServerSideProps from "../hook/useRefreshServerSideProps";
import PrivateLayout from "../layout/PrivateLayout";
import accountService from "../services/account";
import transactionService from "../services/transaction";
import userService from "../services/user";
import { User, UserResult } from "../types/User";
import { ensureAuth } from "../utils/ensureAuth";

interface HomeProps {
  authenticatedUser: User;
  accountBalance: number;
  users: UserResult[];
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Name" },
  { field: "username", headerName: "Username" },
];

export default function Home({
  accountBalance,
  authenticatedUser,
  users,
}: HomeProps) {
  const snackbar = useSnackbar();
  const refresh = useRefreshServerSideProps();

  const transferMutation = useMutation(transactionService.transfer, {
    onSuccess: () => {
      snackbar.success("Transfer succeeded!");
      refresh();
    },
    onError: () => {
      snackbar.error("Failed to complete the transfer. Try again later");
    },
  });

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const rows = users
    .filter((user) => user.id !== authenticatedUser.id)
    .map((user) => ({
      id: user.id,
      username: user.username,
      name: user.name,
    }));

  const isTransferButtonDisabled =
    !selectedUserId || amount <= 0 || amount > accountBalance;

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
              Your balance is, <strong>R$ {accountBalance}</strong>
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

          <DataGrid
            checkboxSelection
            disableSelectionOnClick
            pageSize={5}
            rowsPerPageOptions={[5]}
            rows={rows}
            columns={columns}
            selectionModel={[selectedUserId]}
            onSelectionModelChange={(selected) => {
              const next = selected.filter((rowId) => rowId !== selectedUserId);

              setSelectedUserId(next[0] as string);
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
