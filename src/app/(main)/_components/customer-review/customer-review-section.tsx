"use client";

import Box from "@mui/material/Box";

import { Carousel, CarouselContent, CarouselItem } from "@/components/carousel";

import { SectionTitle } from "../section-title";

import { ReviewCard } from "./review-card";

const reviews = [
  {
    id: 1,
    image: "/images/user.svg",
    name: "David Guetta",
    role: "Designer",
    rating: 5,
    review:
      "Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.",
  },
  {
    id: 2,
    image: "/images/user-2.svg",
    name: "Emma Watson",
    role: "Developer",
    rating: 4,
    review:
      "Amazing product! Really improved my workflow and the support team is fantastic.",
  },
  {
    id: 3,
    image: "/images/user-3.svg",
    name: "Chris Martin",
    role: "Photographer",
    rating: 5,
    review:
      "The quality is top-notch. I highly recommend it to anyone looking for durability and style.",
  },
  {
    id: 4,
    image: "/images/user.svg",
    name: "Sophia Turner",
    role: "UI/UX Designer",
    rating: 5,
    review:
      "Clean design and very easy to use. Definitely one of the best purchases I've made this year.",
  },
  {
    id: 5,
    image: "/images/user-2.svg",
    name: "Michael Smith",
    role: "Entrepreneur",
    rating: 5,
    review:
      "This product exceeded my expectations. The performance and build quality are outstanding.",
  },
  {
    id: 6,
    image: "/images/user-3.svg",
    name: "Olivia Brown",
    role: "Marketer",
    rating: 5,
    review:
      "Good overall, but I think there’s room for improvement in terms of speed and customization.",
  },
  {
    id: 7,
    image: "/images/user.svg",
    name: "Liam Johnson",
    role: "Engineer",
    rating: 5,
    review:
      "Solid, reliable, and well-designed. I’ve recommended it to all my colleagues.",
  },
];

export const CustomerReviewSection = () => {
  return (
    <Box component="section" py={5}>
      <SectionTitle title="Customer reviews" />
      <Carousel opts={{ loop: false }}>
        <CarouselContent sx={{ gap: 1 }}>
          {reviews.map((review) => (
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
    </Box>
  );
};
