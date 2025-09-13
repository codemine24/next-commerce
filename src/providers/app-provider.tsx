"use client";

import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";

import { theme } from "@/theme/theme";

import { AuthProvider } from "./auth-provider";
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
        <AuthProvider>
          {children}
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
