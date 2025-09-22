"use client";

import Box from "@mui/material/Box";
import { PropsWithChildren } from "react";

import { useLayout } from "@/providers/layout-provider";

import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";

export const AdminDashboardLayout = ({ children }: PropsWithChildren) => {
    const { sidebarCompact } = useLayout();

    return (
        <>
            <DashboardSidebar />
            <Box
                sx={{
                    transition: "margin-left 0.3s",
                    ml: { xs: 0, lg: sidebarCompact ? "60px" : "260px" },
                }}
            >
                <DashboardNavbar />
                <Box
                    px={{ xs: 2, md: 3, lg: 5 }}
                    py={{ xs: 2, md: 3 }}
                    bgcolor="background.paper"
                    minHeight="calc(100svh - 50px)"
                    overflow="auto"
                >
                    <Box maxWidth="lg" mx="auto">{children}</Box>
                </Box>
            </Box>
        </>
    );
};