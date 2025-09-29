"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

import { useAuth } from "@/hooks/use-auth";
import { ArrowDownIcon } from "@/icons/arrow-down-icon";
import { UserIcon } from "@/icons/user-icon";

import { UserProfile } from "./user-profile";

export const UserButton = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <UserProfile />
      ) : (
        <Box display="flex" alignItems="center" height="100%" px={3}>
          <Button
            startIcon={<UserIcon />}
            endIcon={<ArrowDownIcon />}
            component={Link}
            href="/login"
            variant="text"
            sx={{
              px: 0,
              minWidth: "auto",
              color: "text.primary",
              fontSize: 12,
              fontWeight: 300,
              "&:hover": {
                textDecoration: "underline",
                backgroundColor: "transparent !important",
              },
            }}
          >
            Login
          </Button>
        </Box>
      )}
    </>
  );
};
