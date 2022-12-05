import { Container, styled, Typography } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";

import { User } from "../types/User";

interface HomeProps {
  documentTitle: string;
  pageTitle?: string;
  user: User;
  children: ReactNode;
}

const Header = styled("header")(({ theme }) => ({
  display: "flex",
  padding: 16,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.getContrastText(theme.palette.background.default),
}));

export default function PrivateLayout({
  children,
  documentTitle,
  pageTitle,
  user,
}: HomeProps) {
  return (
    <>
      <Head>
        <title>{documentTitle}</title>
      </Head>

      <Header>
        <Typography variant="body1" marginLeft="auto">
          Hello, {user.name}
        </Typography>
      </Header>

      <Container maxWidth="md" sx={{ marginTop: 3, height: "100%" }}>
        <main>{children}</main>
      </Container>

      <footer></footer>
    </>
  );
}
