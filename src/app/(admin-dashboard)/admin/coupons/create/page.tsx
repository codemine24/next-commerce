import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getBrands } from "@/actions/brand";
import { getCategories } from "@/actions/category";
import { getProducts } from "@/actions/product";

import { CreateCoupon } from "./_components/create-coupon";

const CreateCouponPage = async () => {
    const brands = await getBrands();
    const categories = await getCategories();
    const products = await getProducts();

    return (
        <Box pb={10}>
            <Typography variant="h3" mb={4}>Create Coupon</Typography>
            <CreateCoupon
                brands={brands.data}
                categories={categories.data}
                products={products.data}
            />
        </Box>
    );
}

export default CreateCouponPage;