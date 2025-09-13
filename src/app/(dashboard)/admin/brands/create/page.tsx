import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { BrandForm } from "../_components/brand-form";

export default function BrandCreate() {
    return (
        <Box pb={10}>
            <Typography variant="h4">Create Brand</Typography>
            <BrandForm />
        </Box>
    );
}