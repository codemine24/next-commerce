"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserNavItem } from "@/interfaces/common";

export const NavItem = ({ item }: { item: UserNavItem }) => {
    const { path, icon, name } = item;

    const pathname = usePathname();
    const isActive = pathname === path;

    return (
        <Box
            component={Link}
            href={path}
            sx={{
                py: 1,
                pl: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderLeft: "2px solid",
                borderColor: isActive ? "primary.main" : "transparent",
                transition: "all 0.2s ease-in-out",
                color: isActive ? "primary.main" : "inherit",
                "&:hover": {
                    color: "primary.main",
                    borderColor: "primary.main",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                {icon}
                <Typography variant="body2" fontWeight={500}>
                    {name}
                </Typography>
            </Box>
        </Box>
    );
}