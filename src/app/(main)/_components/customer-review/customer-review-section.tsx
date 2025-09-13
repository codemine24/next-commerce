"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Carousel, CarouselContent, CarouselItem } from "@/components/carousel";

import { SectionTitle } from "../section-title";
import { ReviewCard } from "./review-card";

export const CustomerReviewSection = () => {
    return (
        <Box component="section" py={5}>
            <SectionTitle title="Customer Review" />
            <Carousel opts={{ loop: false }}>
                <CarouselContent sx={{ gap: 1 }}>
                    {[...Array(5)].map((_, i) => (
                        <CarouselItem
                            key={i + 1}
                            sx={{
                                flexBasis: { xs: "100%", md: "50%", lg: "33.33%" },
                                width: "100%",
                            }}
                        >
                            <ReviewCard />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </Box>
    )
}