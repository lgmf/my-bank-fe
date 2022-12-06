import { Box, Divider, Typography, useTheme } from "@mui/material";
import AccountCard from "../components/AccountCard";
import ButtonLink from "../components/ButtonLink";
import PageTitle from "../components/PageTitle";
import SecondaryText from "../components/SecondaryText";

import TransactionList from "../components/TransactionList";
import PrivateLayout from "../layout/PrivateLayout";
import accountService from "../services/account";
import transactionService from "../services/transaction";
import { Transaction } from "../types/Transaction";
import { User } from "../types/User";
import { ensureAuth } from "../utils/ensureAuth";

interface HomePageProps {
  authenticatedUser: User;
  accountBalance: number;
  transactions: Transaction[];
}

export default function HomePage({
  accountBalance,
  authenticatedUser,
  transactions,
}: HomePageProps) {
  const theme = useTheme();

  return (
    <PrivateLayout documentTitle="Home" user={authenticatedUser}>
      <PageTitle
        title="Account"
        right={
          <ButtonLink href="/transfer" variant="outlined" color="success">
            Send money
          </ButtonLink>
        }
      />

      <Box display="flex" flexDirection="column" gap={3}>
        <AccountCard balance={accountBalance} />

        <Box sx={{ height: 400, width: "100%" }}>
          <SecondaryText gutterBottom variant="body2">
            Recent Transactions
          </SecondaryText>

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
