import Box from "@mui/material/Box";
import { Suspense } from "react";

import { getProducts } from "@/actions/product";
import { BoxContainer } from "@/components/box-container";
import { SearchParams } from "@/interfaces/common";

import { AllProducts } from "./_components/all-products";
import { ProductSidebar } from "./_components/products-sidebar";

const ShopPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const query = await searchParams;
  const products = await getProducts(query);

  return (
    <BoxContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <ProductSidebar searchParams={searchParams} />
          <AllProducts products={products.data} meta={products.meta} />
        </Box>
      </Suspense>
    </BoxContainer>
  );
};

export default ShopPage;