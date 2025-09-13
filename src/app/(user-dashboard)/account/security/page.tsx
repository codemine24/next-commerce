import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { PasswordChangeForm } from "./_components/password-change-form";

export default function PasswordChangePage() {
    return (
        <Box>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Change Password
            </Typography>

            <PasswordChangeForm />
        </Box>
    );
}