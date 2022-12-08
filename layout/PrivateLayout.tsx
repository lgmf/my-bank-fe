import { Container } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";

import { User } from "../types/User";
import Header from "./Header";

interface HomeProps {
  documentTitle: string;
  user: User;
  children: ReactNode;
}

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

      <Header user={user} />

      <Container maxWidth="md" sx={{ height: "100%", paddingBottom: 32 }}>
        <main>{children}</main>
      </Container>

      <footer></footer>
    </>
  );
}
