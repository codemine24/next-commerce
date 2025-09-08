"use client";

import { theme } from "@/theme/theme";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastProvider } from "./toast-provider";

export const AppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
  );
}
