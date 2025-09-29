"use client";

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useRouter } from "next/navigation"

import { ErrorIcon } from "@/icons/error"

interface ErrorComponentProps {
    message?: string;
    hideIcon?: boolean;
    icon?: React.ReactNode;
    retry?: boolean;
    onRetry?: () => void;
}

export const ErrorComponent = ({ message, hideIcon = false, icon, retry = true, onRetry }: ErrorComponentProps) => {
    const router = useRouter();
    const errorMessage = message || "Something went wrong";
    const iconComponent = icon || <ErrorIcon sx={{ height: 48, width: 48, color: "error.main" }} />;

    const handleRetry = () => router.refresh();

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={1} p={2}>
            {!hideIcon && iconComponent}
            <Typography variant="h4" color="text.secondary" mb={2}>{errorMessage}</Typography>
            {retry && <Button variant="contained" onClick={onRetry || handleRetry}>Retry</Button>}
        </Box>
    )
}