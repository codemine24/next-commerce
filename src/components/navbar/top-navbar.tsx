import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { PhoneIcon } from "@/icons/phone";

import { BoxContainer } from "../box-container";

export const TopNavbar = () => {
    return (
        <Box bgcolor="primary.dark">
            <BoxContainer>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="body2" color="primary.contrastText">Get 30% Off on first purchase</Typography>
                    <Box display="flex" alignItems="center" gap={3}>
                        <Button
                            component={Link}
                            href="/shop"
                            variant="text"
                            sx={{
                                color: "primary.contrastText",
                                minWidth: "auto",
                                "&:hover": {
                                    textDecoration: "underline",
                                    backgroundColor: "transparent !important",
                                },
                            }}
                        >
                            Shop Now
                        </Button>
                        <Button
                            component={Link}
                            href="/help"
                            variant="text"
                            sx={{
                                color: "primary.contrastText",
                                minWidth: "auto",
                                "&:hover": {
                                    textDecoration: "underline",
                                    backgroundColor: "transparent !important",
                                },
                            }}
                        >
                            Help
                        </Button>

                        <Box display="flex" alignItems="center" gap={1}>
                            <PhoneIcon sx={{ color: "primary.contrastText", fontSize: 18 }} />
                            <Typography variant="body2" color="primary.contrastText">+1 (555) 123-4567</Typography>
                        </Box>
                    </Box>
                </Box>
            </BoxContainer>
        </Box>
    )
}