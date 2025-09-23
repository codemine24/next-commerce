import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { OptimizeImage } from "@/components/optimize-image";

import { UserInfo } from "./_components/user-info";


export default function Profile() {
    return (
        <Box>
            <Box display="flex" alignItems="start" justifyContent="space-between">
                <Box display="flex" flexDirection="column" gap={2} pb={1}>
                    <OptimizeImage
                        src="https://placehold.co/600x400/png"
                        alt="user"
                        height={120}
                        width={120}
                    />
                    <Box>
                        <Typography variant="h4" fontWeight={600} mb={1}>Rakib Ahmed</Typography>
                        <Typography color="text.secondary" variant="body2">
                            rakib@gmail.com
                        </Typography>
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    component={Link}
                    href="/account/edit-account"
                >
                    Edit Profile
                </Button>
            </Box>

            <Divider sx={{ my: 4 }} />
            <UserInfo />
        </Box>
    );
}