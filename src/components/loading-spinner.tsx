import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const LoadingSpinner = ({ sx }: { sx?: SxProps<Theme> }) => {
    return (
        <Box
            sx={{
                py: 5,
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...sx,
            }}
        >
            <CircularProgress size={50} />
        </Box>
    )
}