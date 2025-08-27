import { BoxContainer } from "@/components/layout/box-container";
import { ProductSidebar } from "./_components/products-sidebar";
import { AllProducts } from "./_components/all-products";

const ShopPage = () => {
    return (
        <BoxContainer sx={{ display: "flex", gap: 2 }}>
            <ProductSidebar />
            <AllProducts />
        </BoxContainer>
    );
};

export default ShopPage;