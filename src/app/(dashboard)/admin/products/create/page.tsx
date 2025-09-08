import Box from "@mui/material/Box";
import { ProductForm } from "../_components/product-form";
import Typography from "@mui/material/Typography";

export default function CreateProduct() {
    return (
        <Box pb={10}>
            <Typography variant="h4">Create Product</Typography>
            <ProductForm />
        </Box>
    );
}