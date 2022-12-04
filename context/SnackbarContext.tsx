import MuiSnackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import React, { createContext, ReactNode, useContext, useState } from "react";

import { createUUID } from "../lib/uuid";

interface SnackbarProviderProps {
  children: ReactNode;
}

interface Snackbar {
  severity: AlertColor;
  message: string;
}

interface SnackbarState {
  success: (message: string) => void;
  error: (message: string) => void;
}

const SnackbarContext = createContext({} as SnackbarState);

export default function useSnackbar() {
  const snackbar = useContext(SnackbarContext);

  if (!snackbar) {
    throw new Error(
      "useSnackbar hook must be used on children of SnackbarProvider"
    );
  }

  return snackbar;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbar, setSnackbar] = useState<Snackbar | null>(null);

  function close() {
    setSnackbar(null);
  }

  function show(message: string, severity: AlertColor = "info") {
    setSnackbar({ message, severity });
  }

  function success(message: string) {
    show(message, "success");
  }

  function error(message: string) {
    show(message, "error");
  }

  return (
    <SnackbarContext.Provider
      value={{
        success,
        error,
      }}
    >
      {snackbar ? (
        <MuiSnackbar open autoHideDuration={2500} onClose={close}>
          <Alert
            severity={snackbar.severity}
            sx={{ width: "100%" }}
            onClose={close}
          >
            {snackbar.message}
          </Alert>
        </MuiSnackbar>
      ) : null}

      {children}
    </SnackbarContext.Provider>
  );
}
