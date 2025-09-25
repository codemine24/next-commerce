import { SxProps } from "@mui/material";
import { ButtonProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface SubmitButtonProps extends ButtonProps {
    sx?: SxProps;
    label: string;
    isLoading?: boolean;
    loadingLabel?: string;
    disabled?: boolean;
}

export const SubmitButton = ({ isLoading, label, sx, loadingLabel = "Loading...", disabled = false, ...props }: SubmitButtonProps) => {
    return (
        <Button disabled={isLoading || disabled} type="submit" sx={{ height: 50, ...sx }} {...props}>
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

