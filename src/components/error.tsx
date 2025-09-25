import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { ErrorIcon } from "@/icons/error"

interface ErrorComponentProps {
    message?: string;
    hideIcon?: boolean;
    icon?: React.ReactNode;
}

export const ErrorComponent = ({ message, hideIcon = false, icon }: ErrorComponentProps) => {
    const errorMessage = message || "Something went wrong";
    const iconComponent = icon || <ErrorIcon sx={{ height: 48, width: 48, color: "error.main" }} />;

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={1} p={2}>
            {!hideIcon && iconComponent}
            <Typography variant="h4" color="text.secondary">{errorMessage}</Typography>
        </Box>
    )
}