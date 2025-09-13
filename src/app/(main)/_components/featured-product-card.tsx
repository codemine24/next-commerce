"use client";

import { Box, Grid } from "@mui/material";
import { SimpleProductCard } from "../shop/_components/simple-product-card";

export default function FeaturedProductCard() {
  const products = [
    {
      id: 1,
      title: "Chair",
      subtitle: "12 brands, 5.5k products",
      imgUrl: "/images/category_chair.png",
    },
    {
      id: 2,
      title: "Table",
      subtitle: "12 brands, 5.5k products",
      imgUrl: "/images/category_table.png",
    },
    {
      id: 3,
      title: "Sofa",
      subtitle: "12 brands, 5.5k products",
      imgUrl: "/images/category_sofa.png",
    },
  ];

  return (
    <Box component="section" py={5}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 4 }} key={product.id}>
            <SimpleProductCard
              title={product.title}
              subtitle={product.subtitle}
              image={product.imgUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
