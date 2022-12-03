import { Typography } from "@mui/material";

import PrivateLayout from "../layout/PrivateLayout";
import { User } from "../types/User";
import { ensureAuth } from "../utils/ensureAuth";

interface HomeProps {
  user: User;
}

export default function Home({ user }: HomeProps) {
  return (
    <PrivateLayout pageTitle="Home">
      <main>
        <Typography variant="h4">Hello, {user.name}</Typography>
      </main>

      <footer></footer>
    </PrivateLayout>
  );
}

export const getServerSideProps = ensureAuth(async ({ user }) => {
  return {
    props: {
      user,
    },
  };
});
