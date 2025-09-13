import Grid from "@mui/material/Grid";
import { HeroCarousel } from "./hero-carousel";
import { FeaturedProducts } from "./featured-products";

export const HeroSection = () => {
  return (
    <Grid component="section" container spacing={2} alignItems="stretch">
      <HeroCarousel />
      <FeaturedProducts />
    </Grid>
  );
};
