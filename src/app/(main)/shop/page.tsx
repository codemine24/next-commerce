import Box from "@mui/material/Box";
import { Suspense } from "react";

import { BoxContainer } from "@/components/box-container";

import { AllProducts } from "./_components/all-products";
import { ProductSidebar } from "./_components/products-sidebar";

const ShopPage = () => {
    return (
        <BoxContainer>
            <Suspense fallback={<div>Loading...</div>}>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <ProductSidebar />
                    <AllProducts />
                </Box>
            </Suspense>
        </BoxContainer>
    );
};

export default ShopPage;