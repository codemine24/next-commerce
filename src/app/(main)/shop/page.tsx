import { BoxContainer } from "@/components/layout/box-container";
import { ProductSidebar } from "./_components/products-sidebar";
import { AllProducts } from "./_components/all-products";
import Box from "@mui/material/Box";

const ShopPage = () => {
    return (
        <BoxContainer>
            <Box sx={{ display: "flex", gap: 2 }}>
                <ProductSidebar />
                <AllProducts />
            </Box>
        </BoxContainer>
    );
};

export default ShopPage;