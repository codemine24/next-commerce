import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Product } from "@/interfaces/product";

import { ProductCard } from "./product-card";
import { FilterApplied } from "./filter-applied";

export const AllProducts = ({ products }: { products: Product[] }) => {
  return (
    <Box flex={1}>
      <FilterApplied />
      <Grid container spacing={2}>
        {products?.map((product) => (
          <Grid size={{ xs: 6, md: 4 }} key={product.id}>
            <ProductCard product={product} action={true} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
