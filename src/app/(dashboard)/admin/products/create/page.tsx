import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ProductForm } from "../_components/product-form";

export default function CreateProduct() {
    return (
        <Box pb={10}>
            <Typography variant="h4">Create Product</Typography>
            <ProductForm />
        </Box>
    );
}