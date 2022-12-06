import { AccountBalance } from "@mui/icons-material";
import { Container, styled, Typography } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";

import ButtonLink from "../components/ButtonLink";
import { User } from "../types/User";

interface HomeProps {
  documentTitle: string;
  user: User;
  children: ReactNode;
}

const Header = styled("header")(({ theme }) => ({
  display: "flex",
  padding: 16,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.getContrastText(theme.palette.background.default),
  marginBottom: 20,
}));

export default function PrivateLayout({
  children,
  documentTitle,
  user,
}: HomeProps) {
  return (
    <>
      <Head>
        <title>{documentTitle}</title>
      </Head>

      <Header>
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ButtonLink
            href="/"
            color="inherit"
            endIcon={<AccountBalance fill="currentColor" />}
          >
            My Bank
          </ButtonLink>

          <Typography variant="body1" marginLeft="auto">
            {user.name}
          </Typography>
        </Container>
      </Header>

      <Container maxWidth="md" sx={{ height: "100%", paddingBottom: 32 }}>
        <main>{children}</main>
      </Container>

      <footer></footer>
    </>
  );
}
