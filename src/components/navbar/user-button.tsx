import Button from "@mui/material/Button";
import { UserIcon } from "@/icons/user";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const UserButton = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            height="100%"
            px={3}
        >
            <UserIcon sx={{ mr: 2 }} />

            <Button
                component={Link}
                href="/login"
                variant="text"
                sx={{
                    px: 0,
                    minWidth: "auto",
                    "&:hover": {
                        textDecoration: "underline",
                        backgroundColor: "transparent !important",
                    },
                }}
            >
                Login
            </Button>

            <Typography component="span" sx={{ mx: 0.5 }}>
                /
            </Typography>

            <Button
                component={Link}
                href="/signup"
                variant="text"
                sx={{
                    px: 0,
                    minWidth: "auto",
                    "&:hover": {
                        textDecoration: "underline",
                        backgroundColor: "transparent !important",
                    },
                }}
            >
                Signup
            </Button>
        </Box>
    );
};