import { Box, Divider } from "@mui/material";
import AccountCard from "../components/AccountCard";
import ButtonLink from "../components/ButtonLink";
import PageTitle from "../components/PageTitle";
import SecondaryText from "../components/SecondaryText";

import TransactionList from "../components/TransactionList";
import PrivateLayout from "../layout/PrivateLayout";
import AccountService from "../services/account";
import TransactionService from "../services/transaction";
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

        <Box>
          <SecondaryText gutterBottom variant="body2">
            Transactions
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

export const getServerSideProps = ensureAuth(async ({ user, ctx }) => {
  const accountService = new AccountService(ctx);
  const transactionService = new TransactionService(ctx);

  const [account, { results: transactions }] = await Promise.all([
    accountService.retrieve(),
    transactionService.list({ limit: 5 }),
  ]);

  return {
    props: {
      authenticatedUser: user,
      accountBalance: account.balance,
      transactions,
    },
  };
});
