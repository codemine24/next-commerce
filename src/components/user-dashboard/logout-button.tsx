"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

import { LogoutIcon } from "@/icons/logout";
import { toast } from "@/lib/toast-store";
import { useAuth } from "@/providers/auth-provider";

export const LogoutButton = () => {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        toast.error("User logged out");
        router.replace("/");
    };
    return (
        <Box px={3}>
            <Button
                startIcon={<LogoutIcon />}
                size="small"
                variant="outlined"
                color="inherit"
                fullWidth
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Box>
    );
};