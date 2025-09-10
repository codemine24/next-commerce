import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { ProductCard } from "./product-card";

const Products = [
  {
    id: "1",
    name: "Bar Cabinet With Integrated Lighting",
    slug: "product-1",
    thumbnail: "",
    price: 100,
    discount_price: 50,
  },
  {
    id: "2",
    name: "Bar Cabinet With Integrated Lighting",
    slug: "product-2",
    thumbnail: "",
    price: 200,
    discount_price: 100,
  },
];

export const AllProducts = () => {
  return (
    <Box flex={1}>
      <Grid container spacing={2}>
        {Products.map((product) => (
          <Grid size={{ xs: 6, md: 4 }} key={product.id}>
            <ProductCard product={product} action={true} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
