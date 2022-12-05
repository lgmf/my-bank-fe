import { Box, Divider, Typography, useTheme } from "@mui/material";
import AccountCard from "../components/AccountCard";
import ButtonLink from "../components/ButtonLink";
import PageTitle from "../components/PageTitle";

import TransactionList from "../components/TransactionList";
import useSnackbar from "../context/SnackbarContext";
import useAccountBalance from "../hook/useAccountBalance";
import PrivateLayout from "../layout/PrivateLayout";
import accountService from "../services/account";
import transactionService from "../services/transaction";
import { Transaction } from "../types/Transaction";
import { User } from "../types/User";
import { ensureAuth } from "../utils/ensureAuth";

interface HomeProps {
  authenticatedUser: User;
  accountBalance: number;
  transactions: Transaction[];
}

export default function Home({
  accountBalance,
  authenticatedUser,
  transactions,
}: HomeProps) {
  // const snackbar = useSnackbar();
  const theme = useTheme();

  const $accountBalance = useAccountBalance(
    authenticatedUser.token,
    accountBalance
  );

  // const transferMutation = useTransferMutation({
  //   onSuccess: () => {
  //     snackbar.success("Transfer succeeded!");
  //     $accountBalance.refetch();
  //   },
  //   onError: () => {
  //     snackbar.error("Failed to complete the transfer. Try again later");
  //   },
  // });

  // const [selectedUserId, setSelectedUserId] = useState<string>("");
  // const [amount, setAmount] = useState<number>(0);

  const balance = $accountBalance.data || accountBalance;

  // const isTransferButtonDisabled =
  //   !selectedUserId || amount <= 0 || amount > balance;

  // function handleTransfer() {
  //   transferMutation.mutate({
  //     amount,
  //     recipientUserId: selectedUserId,
  //     token: authenticatedUser.token,
  //   });
  // }

  return (
    <PrivateLayout
      documentTitle="Home"
      pageTitle="Account"
      user={authenticatedUser}
    >
      <PageTitle
        title="Account"
        right={
          <ButtonLink href="/transfer" variant="outlined" color="success">
            Send money
          </ButtonLink>
        }
      />

      <Box display="flex" flexDirection="column" gap={3}>
        <AccountCard balance={balance} />

        {/* <Box
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
        </Box> */}

        <Box sx={{ height: 400, width: "100%" }}>
          <Typography
            gutterBottom
            variant="body2"
            color={theme.palette.text.secondary}
          >
            Transactions
          </Typography>

          <Divider />

          <TransactionList
            authenticatedUserId={authenticatedUser.id}
            transactions={transactions}
          />
        </Box>
      </Box>
    </PrivateLayout>
  );
}

export const getServerSideProps = ensureAuth(async ({ user }) => {
  const [{ account }, { results: transactions }] = await Promise.all([
    accountService.retrieve(user.token),
    transactionService.list(user.token),
  ]);

  return {
    props: {
      authenticatedUser: user,
      accountBalance: account.balance,
      transactions,
    },
  };
});
