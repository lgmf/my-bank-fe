import { Container } from "@mui/material";
import { ReactNode } from "react";
import Head from "next/head";

import { useAuth } from "../context/AuthContext";
import Header from "./Header";

interface HomeProps {
  documentTitle: string;
  children: ReactNode;
}

export default function PrivateLayout({ children, documentTitle }: HomeProps) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{documentTitle}</title>
      </Head>

      <Header user={user} />

      <Container maxWidth="md" sx={{ height: "100%", paddingBottom: 4 }}>
        <main>{children}</main>
      </Container>

      <footer></footer>
    </>
  );
}
