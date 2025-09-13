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
                sx={(theme) => ({
                    transition: "margin-left 0.3s",
                    marginLeft: sidebarCompact ? "86px" : "280px",
                    [theme.breakpoints.down("lg")]: {
                        marginLeft: 0
                    }
                })}
            >
                <DashboardNavbar />
                <Box px={2} minHeight="calc(100svh - 50px)" overflow="auto">
                    {children}
                </Box>
            </Box>
        </>
    );
};