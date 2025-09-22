"use client";

import { Box, Typography, Grid } from "@mui/material";

const collections = [
  {
    id: 1,
    image: "/images/collections/collectionview.webp",
    title: "Exceptional Furniture For The Taskmasters",
    description:
      "We founded GRID: to make it easy for teams of all sizes to create an office you love. We sell direct, so our collection costs half as much as premium furniture of comparable quality.",
  },
  {
    id: 2,
    image: "/images/collections/collectionview.webp",
    title: "Ergonomic Design",
    description:
      "Enjoy stylish and ergonomic work seating for every budget, from the home office to the open office. Durable, adjustable and built to inspire: make your office feel like home with contract-grade desks & chairs from GRID Furniture.",
  },
  {
    id: 3,
    image: "/images/collections/collectionview.webp",
    title: "Wherever you are, work your best.",
    description:
      "Our breathable mesh material provides an optimal air flow to avoid sweating and sticking, keep air circulation for extra comfy, and the mesh office chair resists abrasion and transformation.",
  },
];

export const CollectionView = () => {
  return (
    <Grid container spacing={4}>
      {collections.map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              maxWidth: 650,
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                bgcolor: "#000000",
                opacity: 0,
                transition: "opacity 1s ease",
              },
              "&:hover::after": {
                opacity: 0.1,
              },
              "&:hover img": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Box width={"100%"} sx={{ height: 380, overflow: "hidden" }}>
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 2s ease",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              bottom: 0,
              color: "text.primary",
              textAlign: "center",
            }}
          >
            <Typography variant="h3" fontWeight={600} sx={{ py: 2 }}>
              {item.title}
            </Typography>
            <Typography variant="body1">{item.description}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
