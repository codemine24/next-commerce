"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselDots
}
    from '@/components/ui/carousel';
import Grid from '@mui/material/Grid';
import OptimizeImage from '@/components/ui/optimize-image';

export const HeroCarousel = () => {
    return (
        <Grid size={{ xs: 12, lg: 8 }}>
            <Carousel>
                <CarouselContent>
                    {[...Array(5)].map((_, i) => (
                        <CarouselItem key={i}>
                            <OptimizeImage
                                src="/assets/carousel.webp"
                                alt="Hero Carousel"
                                height={420}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselDots
                    variant="line"
                    sx={{
                        position: 'absolute',
                        bottom: 20,
                        left: 0,
                        right: 0,
                    }} />
            </Carousel>
        </Grid>
    );
}