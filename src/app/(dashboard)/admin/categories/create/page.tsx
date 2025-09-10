import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CategoryForm } from "../_components/category-form";

export default function CategoryCreatePage() {
    return (
        <Box pb={10}>
            <Typography variant="h4">Create Category</Typography>
            <CategoryForm />
        </Box>
    );
}