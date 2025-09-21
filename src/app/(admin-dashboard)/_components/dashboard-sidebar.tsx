"use client";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

import { useLayout } from "@/providers/layout-provider";

import { AdminProfile } from "./admin-profile";
import { LayoutDrawer } from "./layout-drawer";
import { LogoArea } from "./logo-area";
import { MultiLevelMenu } from "./multi-level-menu";

export const DashboardSidebar = () => {
    const {
        sidebarCompact,
        TOP_HEADER_AREA,
        showMobileSideBar,
        handleSidebarHover,
        handleCloseMobileSidebar
    } = useLayout();

    const theme = useTheme();
    const downLg = useMediaQuery(theme.breakpoints.down("lg"));

    if (downLg) {
        return (
            <LayoutDrawer open={showMobileSideBar} onClose={handleCloseMobileSidebar}>
                <Box
                    p={2}
                    maxHeight={TOP_HEADER_AREA}
                    bgcolor="background.default"
                    color="text.primary"
                    height="100%"
                >
                    <Image
                        alt="Logo"
                        width={105}
                        height={50}
                        src="/assets/images/logo.svg"
                        style={{ marginLeft: 8 }}
                    />
                </Box>

                <MultiLevelMenu />
            </LayoutDrawer>
        );
    }

    return (
        <Box
            onMouseEnter={() => handleSidebarHover(true)}
            onMouseLeave={() => sidebarCompact && handleSidebarHover(false)}
            sx={(theme) => ({
                width: sidebarCompact ? 60 : 280,
                height: "100vh",
                position: "fixed",
                transition: "all 0.2s ease",
                zIndex: theme.zIndex.drawer,
                bgcolor: "background.default",
                color: "text.primary",
                borderRight: 1,
                borderColor: "divider",
                display: "flex",
                flexDirection: "column",
                ...(sidebarCompact && {
                    "&:hover": {
                        width: 280
                    }
                })
            })}
        >
            {/* SIDEBAR TOP LOGO SECTION */}
            <LogoArea />

            {/* SIDEBAR NAVIGATION SECTION */}
            <MultiLevelMenu />

            {/* SIDEBAR ADMIN PROFILE SECTION */}
            <AdminProfile />
        </Box>
    );
};