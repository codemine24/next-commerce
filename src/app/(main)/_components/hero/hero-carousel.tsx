"use client";

import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/carousel";
import { OptimizeImage } from "@/components/optimize-image";

export const HeroCarousel = () => {
  const route = useRouter();
  return (
    <Grid size={{ xs: 12, lg: 8 }}>
      <Carousel autoplay pauseOnHover>
        <CarouselContent>
          {[...Array(5)].map((_, i) => (
            <CarouselItem key={i + 1} onClick={() => route.push("/shop")}>
              <OptimizeImage
                src="/images/banner.png"
                alt="Hero Carousel"
                height={420}
                sx={{ cursor: "pointer" }}
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
