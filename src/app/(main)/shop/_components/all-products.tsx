import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Pagination } from "@/components/pagination";
import { Meta } from "@/interfaces/api";
import { Product } from "@/interfaces/product";

import { ProductCard } from "./product-card";
import { ProductsCount } from "./products-count";

interface AllProductsProps {
  products: Product[];
  meta: Meta;
}

export const AllProducts = ({ products, meta }: AllProductsProps) => {
  return (
    <Box flex={1}>
      <ProductsCount meta={meta} />
      <Grid container spacing={2}>
        {products?.map((product) => (
          <Grid size={{ xs: 6, md: 4 }} key={product.id}>
            <ProductCard product={product} action={true} />
          </Grid>
        ))}
      </Grid>

      <Box p={2}>
        <Pagination page={meta.page} total={meta.total} limit={meta.limit} />
      </Box>
    </Box>
  );
};
