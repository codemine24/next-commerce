import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getBrands } from "@/actions/brand";

import { CreateProduct } from "./_components/create-product";

const CreateProductPage = async () => {
    const brands = await getBrands();

    return (
        <Box pb={10}>
            <Typography variant="h3" mb={4}>Create Product</Typography>
            <CreateProduct brands={brands.data} />
        </Box>
    );
}

export default CreateProductPage;