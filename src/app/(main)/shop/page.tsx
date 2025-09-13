import { BoxContainer } from "@/components/box-container";
import { ProductSidebar } from "./_components/products-sidebar";
import { AllProducts } from "./_components/all-products";
import Box from "@mui/material/Box";
import { Suspense } from "react";

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