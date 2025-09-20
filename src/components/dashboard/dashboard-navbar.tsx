"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import { HamburgerIcon } from "@/icons/hamburger";
import { useLayout } from "@/providers/layout-provider";

export const DashboardNavbar = () => {
  const { handleOpenMobileSidebar } = useLayout();

  return (
    <AppBar
      position="sticky"
      sx={(theme) => ({
        mt: 0,
        zIndex: 11,
        pt: "1rem",
        pb: "1rem",
        bgcolor: "#ffffff",
        boxShadow: theme.shadows[2],
        color: theme.palette.text.primary,
      })}
    >
      <Toolbar
        disableGutters
        sx={{
          "@media (min-width:0px)": {
            pl: 0,
            pr: 0,
            minHeight: "auto",
          },
        }}
      >
        <Box>
          <IconButton
            sx={{ display: { xs: "block", lg: "none" } }}
            onClick={handleOpenMobileSidebar}
          >
            <HamburgerIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
