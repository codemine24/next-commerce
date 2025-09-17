import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { getProducts } from "@/actions/product/user.product";
import { Product } from "@/interfaces/product";

import { ProductCard } from "../shop/_components/product-card";

import { SectionTitle } from "./section-title";

export const NewArrivals = async () => {
  const data = await getProducts();

  return (
    <Box component="section" py={5}>
      <SectionTitle title="New Arrivals" href="/shop" />
      <Grid container spacing={2}>
        {data?.data?.map((product: Product) => (
          <Grid key={product.id} size={{ xs: 6, md: 3 }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
