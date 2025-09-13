import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface SubmitButtonProps {
    sx?: SxProps;
    label: string;
    isLoading?: boolean;
    loadingLabel?: string;
    variant?: "contained" | "outlined" | "text";
}

export const SubmitButton = ({ isLoading, label, sx, loadingLabel = "Loading...", variant = "contained" }: SubmitButtonProps) => {
    return (
        <Button disabled={isLoading} type="submit" variant={variant} sx={{ height: 50, ...sx }}>
            {
                isLoading
                    ? <Box display="flex" alignItems="center" gap={2}>
                        <CircularProgress size={20} />
                        {loadingLabel}
                    </Box>
                    : label
            }
        </Button>
    )
}

