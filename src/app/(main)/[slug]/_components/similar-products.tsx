import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { getProducts } from "@/actions/product";
import { Product } from "@/interfaces/product";

import { ProductSectionHeader } from "../../[slug]/_components/product-section-header";
import { ProductCard } from "../../shop/_components/product-card";

export const SimilarProducts = async () => {
  const products = await getProducts();

  return (
    <>
      <Box component="section">
        <ProductSectionHeader title="Similar Products" />
        <Grid
          container
          spacing={2}
          sx={{
            mt: 3,
          }}
        >
          {products?.data?.map((product: Product) => (
            <Grid key={product.id} size={{ xs: 6, md: 4, lg: 3 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
