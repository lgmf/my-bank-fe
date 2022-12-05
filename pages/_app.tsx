import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";

import AuthProvider from "../context/AuthContext";
import { SnackbarProvider } from "../context/SnackbarContext";
import queryClient from "../lib/query-client";
import { ThemeProvider } from "../context/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
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
