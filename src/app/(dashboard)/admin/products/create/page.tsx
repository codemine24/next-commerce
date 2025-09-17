import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ProductFormContainer } from "../_components/product-form-container";

export default function CreateProduct() {
    return (
        <Box pb={10}>
            <Typography variant="h4">Create Product</Typography>
            <ProductFormContainer />
        </Box>
    );
}