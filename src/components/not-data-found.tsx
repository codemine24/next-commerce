import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { SadIcon } from "@/icons/sad"

interface NotDataFoundProps {
    message?: string;
    showIcon?: boolean;
    icon?: React.ReactNode;
}

export const NotDataFound = ({ message, showIcon = true, icon }: NotDataFoundProps) => {
    const notDataFoundMessage = message || "No data found";
    const iconComponent = icon || <SadIcon sx={{ height: 48, width: 48, color: "primary.main" }} />;

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={1} p={2}>
            {showIcon && iconComponent}
            <Typography variant="h4" color="text.secondary">{notDataFoundMessage}</Typography>
        </Box>
    )
}