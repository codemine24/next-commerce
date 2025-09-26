import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getBrands } from "@/actions/brand";
import { getProductBySlug } from "@/actions/product";

import { EditProduct } from "./_components/edit-product";

const EditProductPage = async ({ params }: { params: { slug: string } }) => {
    const brandsPromise = getBrands();
    const productPromise = getProductBySlug(params.slug);

    const [brands, product] = await Promise.all([brandsPromise, productPromise]);

    return (
        <Box pb={10}>
            <Typography variant="h3" mb={4}>Edit Product</Typography>
            <EditProduct brands={brands.data} product={product.data} />
        </Box>
    );
}

export default EditProductPage;