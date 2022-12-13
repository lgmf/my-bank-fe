import { Box, Divider } from "@mui/material";
import AccountCard from "../components/AccountCard";
import ButtonLink from "../components/ButtonLink";
import PageTitle from "../components/PageTitle";
import SecondaryText from "../components/SecondaryText";

import TransactionList from "../components/TransactionList";
import PrivateLayout from "../layout/PrivateLayout";
import { ensureAuth } from "../utils/ensureAuth";

export default function HomePage() {
  return (
    <PrivateLayout documentTitle="Home">
      <PageTitle
        title="Account"
        right={
          <ButtonLink href="/transfer" variant="outlined" color="success">
            Send money
          </ButtonLink>
        }
      />

      <Box display="flex" flexDirection="column" gap={3}>
        <AccountCard />

        <Box>
          <SecondaryText gutterBottom variant="body2">
            Transactions
          </SecondaryText>

          <Divider />

          <TransactionList />
        </Box>
      </Box>
    </PrivateLayout>
  );
}

export const getServerSideProps = ensureAuth();
