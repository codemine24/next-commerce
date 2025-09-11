"use client";

import Grid from "@mui/material/Grid";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/carousel";
import { OptimizeImage } from "@/components/optimize-image";

export const HeroCarousel = () => {
  return (
    <Grid size={{ xs: 12, lg: 8 }}>
      <Carousel autoplay pauseOnHover={true}>
        <CarouselContent>
          {[...Array(5)].map((_, i) => (
            <CarouselItem key={i + 1} onClick={() => console.log("click")}>
              <OptimizeImage
                src="/images/banner.png"
                alt="Hero Carousel"
                height={420}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots
          variant="dot"
          sx={{
            position: "absolute",
            bottom: 40,
            left: 0,
            right: 0,
            p: 1,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(18px)",
            width: "fit-content",
            justifySelf: "center",
          }}
        />
      </Carousel>
    </Grid>
  );
};
