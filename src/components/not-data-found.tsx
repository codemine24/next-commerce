import Box from "@mui/material/Box"
import { SxProps, Theme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"

import { SadIcon } from "@/icons/sad"

interface NotDataFoundProps {
    message?: string;
    hideIcon?: boolean;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    sx?: SxProps<Theme>;
}

export const NotDataFound = ({ message, hideIcon = false, icon, action, sx }: NotDataFoundProps) => {
    const notDataFoundMessage = message || "No data found";
    const iconComponent = icon || <SadIcon sx={{ height: 48, width: 48, color: "primary.main" }} />;

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={1} p={2} sx={sx}>
            {!hideIcon && iconComponent}
            <Typography variant="h4" color="text.secondary">{notDataFoundMessage}</Typography>
            {action}
        </Box>
    )
}