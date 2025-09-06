"use client";

import { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardNavbar } from "./dashboard-navbar";
import { useLayout } from "@/providers/layout-provider";

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
                <Box px={2}>{children}</Box>
            </Box>
        </>
    );
};