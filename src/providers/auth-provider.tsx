"use client";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React from "react";

import { User } from "@/interfaces/user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AUTH_CONTEXT = React.createContext<AuthContextType>({
  user: null,
  setUser: () => { },
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const getUser = React.useCallback(async () => {
    const token = Cookies.get("access_token");
    if (token && !isAuthenticated) {
      try {
        const decodedToken = jwtDecode(token || "") as User;
        setUser(decodedToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
      }
    }
  }, [isAuthenticated]);

  const logout = React.useCallback(() => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("cart");
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  React.useEffect(() => {
    const token = Cookies.get("access_token");
    if (token && !isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated, getUser]);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    logout,
  };
  return (
    <AUTH_CONTEXT.Provider value={value}>{children}</AUTH_CONTEXT.Provider>
  );
};
