import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { BoxContainer } from "@/components/box-container";
import { CheckCircle } from "@/icons/check-circle";

export default function PaymentStatusPage() {
    return (
        <BoxContainer>
            <Box
                maxWidth={400}
                width="100%"
                mx="auto"
                textAlign="center"
                py={2}
                mt={5}
                border={1}
                borderColor="divider"
                bgcolor="Background.paper"
            >
                <CheckCircle sx={{ color: 'primary.main', width: 100, height: 100 }} />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Payment Successful
                </Typography>
                <Typography sx={{ mb: 3 }}>Thank you for your purchase 🎉</Typography>
                <Button variant="contained" LinkComponent={Link} href="/">
                    Return Home
                </Button>
            </Box>
        </BoxContainer>
    );
}