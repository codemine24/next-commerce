import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getCategories } from "@/actions/category";

import { CreateCategory } from "./_components/create-category";

const CategoryCreatePage = async () => {
    const categories = await getCategories();

    return (
        <Box pb={10}>
            <Typography variant="h4" sx={{ my: 4 }}>Create Category</Typography>
            <CreateCategory categories={categories.data} />
        </Box>
    );
}

export default CategoryCreatePage;
