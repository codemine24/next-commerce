import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";

import { ChevronLeftIcon } from "@/icons/chevron-left";
import { useLayout } from "@/providers/layout-provider";

export const LogoArea = () => {
    const { TOP_HEADER_AREA, COMPACT, sidebarCompact, handleSidebarCompactToggle } = useLayout();

    return (
        <Box
            p={2}
            maxHeight={TOP_HEADER_AREA}
            display="flex"
            alignItems="center"
            justifyContent={COMPACT ? "center" : "space-between"}
        >

            Logo
            <IconButton
                color="inherit"
                sx={{
                    display: COMPACT ? "none" : "flex",
                    "&:hover": {
                        backgroundColor: "action.selected"
                    }
                }}
                onClick={handleSidebarCompactToggle}
            >
                <ChevronLeftIcon
                    sx={{
                        transform: sidebarCompact ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "all 0.3s ease",
                        width: 28,
                        height: 28,
                    }} />
            </IconButton>
        </Box>
    );
}