import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { ProductCard } from "../shop/_components/product-card";

import { SectionTitle } from "./section-title";

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
  {
    id: "5",
    name: "Living Room Furniture Chair",
    slug: "product-1",
    thumbnail: "",
    price: 100,
    discount_price: 50,
  },
  {
    id: "6",
    name: "Living Room Furniture Chair",
    slug: "product-2",
    thumbnail: "",
    price: 200,
    discount_price: 100,
  },
  {
    id: "7",
    name: "Living Room Furniture Chair",
    slug: "product-1",
    thumbnail: "",
    price: 100,
    discount_price: 50,
  },
  {
    id: "8",
    name: "Living Room Furniture Chair",
    slug: "product-2",
    thumbnail: "",
    price: 200,
    discount_price: 100,
  },
];

export const NewArrivals = () => {
  return (
    <Box component="section" py={5}>
      <SectionTitle title="New Arrivals" href="/shop" />
      <Grid container spacing={2}>
        {Products.map((product) => (
          <Grid key={product.id} size={{ xs: 6, md: 3 }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
