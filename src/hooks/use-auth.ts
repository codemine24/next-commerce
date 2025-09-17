import { useContext } from "react";

import { AUTH_CONTEXT } from "@/providers/auth-provider";

export const useAuth = () => {
  const context = useContext(AUTH_CONTEXT);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
