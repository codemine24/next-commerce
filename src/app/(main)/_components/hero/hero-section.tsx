import Grid from "@mui/material/Grid";

import { FeaturedProducts } from "./featured-products";
import { HeroCarousel } from "./hero-carousel";

export const HeroSection = () => {
  return (
    <Grid component="section" container spacing={2} alignItems="stretch">
      <HeroCarousel />
      <FeaturedProducts />
    </Grid>
  );
};
