import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect } from "react";
import { QueryClientProvider } from "react-query";
import NProgress from "nprogress";

import AuthProvider from "../context/AuthContext";
import { SnackbarProvider } from "../context/SnackbarContext";
import queryClient from "../lib/query-client";
import { ThemeProvider } from "../context/ThemeContext";

import "nprogress/nprogress.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SnackbarProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
