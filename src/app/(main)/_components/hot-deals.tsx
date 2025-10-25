import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { getProducts } from "@/actions/product";
import { Product } from "@/interfaces/product";

import { ProductCard } from "../shop/_components/product-card";

import { SectionTitle } from "./section-title";

export const HotDeals = async () => {
  const products = await getProducts({ is_hot_deal: true });
  console.log("products.........", products);

  return (
    <Box component="section" py={5}>
      <SectionTitle title="Hot Deals" href="/shop" />
      {products?.data?.map((product: Product) => (
        <div key={product.id}>hello</div>
      ))}
      <Grid container spacing={2}>
        {products?.data?.map((product: Product) => (
          <Grid key={product.id} size={{ xs: 6, md: 4, lg: 3 }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
