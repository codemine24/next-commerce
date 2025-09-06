import { ChevronLeftIcon } from "@/icons/chevron-left";
import { useLayout } from "@/providers/layout-provider";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
// LOCAL CUSTOM HOOK


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
                        backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }
                }}
                onClick={handleSidebarCompactToggle}
            >
                <ChevronLeftIcon
                    sx={{
                        transform: sidebarCompact ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "all 0.3s ease",
                    }} />
            </IconButton>
        </Box>
    );
}