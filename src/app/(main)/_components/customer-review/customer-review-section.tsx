import Box from "@mui/material/Box";

import { getCompanyReviews } from "@/actions/company-reviews";
import { Carousel, CarouselContent, CarouselItem } from "@/components/carousel";

import { SectionTitle } from "../section-title";

import { ReviewCard, ReviewCardProps } from "./review-card";

export const CustomerReviewSection = async () => {
  const companyReviewsResponse = await getCompanyReviews();

  return (
    <Box component="section" py={5}>
      <SectionTitle title="Customer reviews" />
      {companyReviewsResponse?.data?.length > 0 && (
        <Carousel opts={{ loop: false }}>
          <CarouselContent sx={{ gap: 1 }}>
            {companyReviewsResponse?.data.map((review: ReviewCardProps) => (
              <CarouselItem
                key={review.id}
                sx={{
                  flexBasis: { xs: "100%", md: "50%", lg: "33.33%" },
                  width: "100%",
                }}
              >
                <ReviewCard {...review} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </Box>
  );
};
