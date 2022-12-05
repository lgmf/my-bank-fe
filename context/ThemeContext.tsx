import {
  createTheme,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    background: {
      default: "#000",
    },
  },
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MuiThemeProvider theme={theme}>
      <>
        <GlobalStyles
          styles={{
            "*": {
              boxSizing: "border-box",
              margin: 0,
              padding: 0,
            },
            a: {
              textDecoration: "none",
              color: "inherit",
            },
          }}
        />

        {children}
      </>
    </MuiThemeProvider>
  );
}
