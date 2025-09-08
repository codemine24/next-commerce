import { Box, Grid } from "@mui/material";

const Products = [
  {
    id: 1,
    title: "Chairs",
    subtitle: "12 brands, 5.5k products",
    imgUrl: "",
  },
];

export const ProductShowcase = () => {
  return (
    <Box component="section" py={5}>
      <Grid container spacing={2}>
        {Products.map((product) => (
          <Grid key={product.id} size={{ xs: 6, md: 4, lg: 3 }}></Grid>
        ))}
      </Grid>
    </Box>
  );
};
