"use client";

import { Box, Grid } from "@mui/material";

import { DetailsCard } from "./details-card";
import { ProductSectionHeader } from "./product-section-header";

export const ProductDetails = () => {
  const details = [
    {
      title: "Compact & Durable",
      description:
        "The M23 Mid Century Modern Sofa combines timeless aesthetics with durable craftsmanship. Its sleek lines, wooden frame, and plush cushions make it a centerpiece for both modern and classic interiors.",
    },
    {
      title: "Premium Comfort",
      description:
        "Designed with high-density foam cushions and breathable fabric, this sofa ensures long-lasting comfort for everyday lounging and relaxation.",
    },
    {
      title: "Elegant Design",
      description:
        "The minimalist silhouette and mid-century modern accents add sophistication, making it blend seamlessly into any interior style.",
    },
    {
      title: "Easy Maintenance",
      description:
        "The removable cushion covers and stain-resistant fabric make cleaning and maintenance effortless, keeping your sofa looking new for years.",
    },
  ];

  return (
    <Box id="#product-description">
      <ProductSectionHeader title="Details"  />
      <Grid container spacing={2} mt={3}>
        {details.map((item, index) => (
          <Grid key={index}>
            <DetailsCard
              title={item.title}
              description={item.description}
              index={index}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
