import { Container } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";

interface HomeProps {
  pageTitle: string;
  children: ReactNode;
}

export default function PrivateLayout({ children, pageTitle }: HomeProps) {
  return (
    <Container maxWidth="sm">
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <main>{children}</main>

      <footer></footer>
    </Container>
  );
}
