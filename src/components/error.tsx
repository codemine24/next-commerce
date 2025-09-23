import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { ErrorIcon } from "@/icons/error"

export const ErrorComponent = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={2}>
            <ErrorIcon sx={{ height: 48, width: 48, color: "error.main" }} />
            <Typography variant="h4">Something went wrong</Typography>
        </Box>
    )
}