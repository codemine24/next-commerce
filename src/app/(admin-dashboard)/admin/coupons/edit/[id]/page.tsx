import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";

import { getBrands } from "@/actions/brand";
import { getCategories } from "@/actions/category";
import { getCouponById } from "@/actions/coupon";
import { getProducts } from "@/actions/product";
import { ErrorComponent } from "@/components/error-component";
import { LoadingSpinner } from "@/components/loading-spinner";

import { EditCoupon } from "./_components/edit-coupon";

const EditCouponPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    try {
        const { id } = await params;
        const brandsPromise = getBrands();
        const productsPromise = getProducts();
        const categoriesPromise = getCategories();
        const couponPromise = getCouponById(id);

        const [brands, products, categories, coupon] = await Promise.all([brandsPromise, productsPromise, categoriesPromise, couponPromise]);

        return (
            <Box pb={10}>
                <Suspense fallback={<LoadingSpinner />}>
                    <Typography variant="h3" gutterBottom>
                        Edit Coupon
                    </Typography>
                    <EditCoupon coupon={coupon.data} brands={brands.data} categories={categories.data} products={products.data} />
                </Suspense>
            </Box>
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return <ErrorComponent message="Sorry, there was an error loading the coupon data." />;
    }
}

export default EditCouponPage;