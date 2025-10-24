import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getBrands } from "@/actions/brand";
import { getCategories } from "@/actions/category";

import { CreateProduct } from "./_components/create-product";

const CreateProductPage = async () => {
    const brandsPromise = getBrands();
    const categoriesPromise = getCategories();

    const [brands, categories] = await Promise.all([brandsPromise, categoriesPromise]);

    console.log(brands, categories);

    return (
        <Box pb={10}>
            <Typography variant="h3" mb={4}>Create Product</Typography>
            <CreateProduct brands={brands.data} categories={categories.data} />
        </Box>
    );
}

export default CreateProductPage;