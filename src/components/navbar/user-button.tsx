"use client";

import { ArrowDownIcon } from "@/icons/arrow-down-icon";
import { UserIcon } from "@/icons/user-icon";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";
import { UserProfile } from "./user-profile";

export const UserButton = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? <UserProfile /> : <Box display="flex" alignItems="center" height="100%" px={3}>
        <Button
          startIcon={<UserIcon />}
          endIcon={<ArrowDownIcon />}
          component={Link}
          href="/login"
          variant="text"
          sx={{
            px: 0,
            minWidth: "auto",
            "&:hover": {
              textDecoration: "underline",
              backgroundColor: "transparent !important",
            },
            color: "text.primary",
          }}
        >
          Login
        </Button>
      </Box>}
    </>
  );
};
