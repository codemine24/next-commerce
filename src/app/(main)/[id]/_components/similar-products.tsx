import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { ProductSectionHeader } from "../../[slug]/_components/product-section-header";
import { ProductCard } from "../../shop/_components/product-card";

// import { ProductSectionHeader } from "./product-section-header";

const Products = [
  {
    id: "1",
    name: "Living Room Furniture Chair",
    slug: "product-1",
    thumbnail: "",
    price: 100,
    discount_price: 50,
  },
  {
    id: "2",
    name: "Living Room Furniture Chair",
    slug: "product-2",
    thumbnail: "",
    price: 200,
    discount_price: 100,
  },
  {
    id: "3",
    name: "Living Room Furniture Chair",
    slug: "product-1",
    thumbnail: "",
    price: 100,
    discount_price: 50,
  },
  {
    id: "4",
    name: "Living Room Furniture Chair",
    slug: "product-2",
    thumbnail: "",
    price: 200,
    discount_price: 100,
  },
];

export const SimilarProducts = () => {
  return (
    <>
      <Box component="section">
        <ProductSectionHeader title="Similar Products" />
        <Grid
          container
          spacing={2}
          bgcolor="background.paper"
          sx={{
            p: { xs: 2, sm: 3 },
            mt: 2,
          }}
        >
          {Products.map((product) => (
            <Grid key={product.id} size={{ xs: 6, md: 4, lg: 3 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
