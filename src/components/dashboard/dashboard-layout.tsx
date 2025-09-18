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
                    ml: { xs: 0, lg: sidebarCompact ? "86px" : "280px" },
                }}
            >
                <DashboardNavbar />
                <Box px={2} minHeight="calc(100svh - 50px)" overflow="auto">
                    {children}
                </Box>
            </Box>
        </>
    );
};