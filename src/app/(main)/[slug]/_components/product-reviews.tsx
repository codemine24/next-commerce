import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

import { getReviews } from "@/actions/review";
import { StarIcon } from "@/icons/star";

import { ProductAddReview } from "./product-add-review";
import { ProductSectionHeader } from "./product-section-header";

type Review = {
  id: string;
  comment: string;
  created_at: string;
  product: { name: string };
  rating: number;
  updated_at: string;
  user: {
    contact_number: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  date: string;
};

const distribution = [
  { stars: 5, count: 330, color: "#22c55e" },
  { stars: 4, count: 150, color: "#5b21b6" },
  { stars: 3, count: 180, color: "#f59e0b" },
  { stars: 2, count: 12, color: "#fb923c" },
  { stars: 1, count: 8, color: "#ef4444" },
];

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = async ({ productId }: ProductReviewsProps) => {
  const avg = 4.5;
  const total = 688;
  const maxCount = Math.max(...distribution.map((d) => d.count));

  const allReviews = await getReviews(productId);

  return (
    <Box id="#product-reviews">
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <ProductSectionHeader title="Customer Reviews" />
        <ProductAddReview productId={productId} />
      </Box>

      {/* Body */}
      <Box bgcolor="transparent">
        {/* Top stats + distribution */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={2}
          mt={2}
          alignItems="stretch"
        >
          <Stack
            direction="row"
            gap={2}
            flexWrap="wrap"
            sx={{ width: { xs: "100%", md: "55%" } }}
          >
            <StatCard label="Total Reviews" value={total.toLocaleString()} />
            <StatCard
              label="Average Rating"
              value={avg.toString()}
              extra={
                <Rating
                  name="avg-rating"
                  value={avg}
                  precision={0.5}
                  readOnly
                  size="small"
                  sx={{ color: "#f59e0b" }}
                  aria-label={"Average rating " + avg}
                />
              }
            />
          </Stack>

          <Box
            sx={{
              p: 2,
              flex: 1,
              width: { xs: "100%", md: "50%" },
              bgcolor: "background.paper",
            }}
            aria-label="Rating distribution"
          >
            <Stack gap={1.25}>
              {distribution.map((item) => {
                const width = Math.max(
                  6,
                  Math.round((item.count / maxCount) * 100)
                );
                return (
                  <Stack
                    key={item.stars}
                    direction="row"
                    alignItems="center"
                    gap={2}
                    sx={{ width: "100%" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: 20,
                        color: "text.secondary",
                        fontWeight: 600,
                        gap: 0.5,
                      }}
                      aria-hidden
                    >
                      <Typography component="span">{item.stars}</Typography>
                      <StarIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
                    </Box>
                    <Box
                      sx={{
                        position: "relative",
                        flex: 1,
                        height: 8,
                        bgcolor: "grey.100",
                        borderRadius: 999,
                        overflow: "hidden",
                      }}
                      role="progressbar"
                      aria-valuenow={item.count}
                      aria-valuemin={0}
                      aria-valuemax={maxCount}
                      aria-label={`${item.stars} star reviews`}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: `${width}%`,
                          bgcolor: item.color,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        width: 34,
                        textAlign: "right",
                        color: "text.secondary",
                      }}
                    >
                      {item.count}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        </Stack>

        {/* Reviews list */}
        <Stack sx={{ mt: 2 }} bgcolor="background.paper">
          {allReviews.data.map((r: Review, index: number) => (
            <React.Fragment key={r.id}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 0,
                  overflow: "hidden",
                }}
                component="section"
                aria-labelledby={`review-${r.id}-heading`}
              >
                <Typography
                  id={`review-${r.id}-heading`}
                  variant="body1"
                  sx={{ color: "text.primary" }}
                >
                  {r.comment}
                </Typography>

                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1.5}
                  sx={{ mt: 1.5, color: "text.secondary" }}
                >
                  <Rating
                    name={`rating-${r.id}`}
                    value={r.rating}
                    readOnly
                    precision={0.5}
                    size="small"
                    sx={{ color: "#f59e0b" }}
                    icon={<StarIcon fontSize="inherit" />}
                    emptyIcon={
                      <StarIcon fontSize="inherit" sx={{ opacity: 0.25 }} />
                    }
                    aria-label={`Rating ${r.rating} out of 5`}
                  />
                  <Separator />
                  <Typography variant="body2">
                    By {r.user.first_name}
                  </Typography>
                  <Separator />
                  <Typography variant="body2">{r.date}</Typography>
                </Stack>
              </Box>

              {index < allReviews.data.length - 1 && (
                <Divider sx={{ my: 2, bgcolor: "divider" }} />
              )}
            </React.Fragment>
          ))}
        </Stack>

        {/* Pagination */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
          }}
          aria-label="Reviews pagination"
        >
          <Pagination
            count={4}
            page={1}
            shape="rounded"
            variant="outlined"
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

function StatCard({
  label,
  value,
  extra,
}: {
  label: string;
  value: string;
  extra?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        p: 2,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.paper",
      }}
      role="group"
      aria-label={label}
    >
      <Typography
        variant="h4"
        sx={{ color: "text.secondary", fontWeight: 400, mb: 0.5 }}
      >
        {label}
      </Typography>
      <Typography variant="h2">{value}</Typography>
      {extra}
    </Box>
  );
}

function Separator() {
  return (
    <Divider
      orientation="vertical"
      flexItem
      sx={{ borderColor: "divider", mx: 0.25 }}
      aria-hidden
    />
  );
}
