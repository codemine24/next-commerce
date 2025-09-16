import z from "zod";

const createReview = z.object({
  body: z
    .object({
      product_id: z.uuid({ error: "Product id should be a valid uuid" }),
      rating: z
        .number({ error: "Rating should be a number" })
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5"),
      comment: z
        .string({ error: "Comment should be a text" })
        .min(1, "Comment is required"),
    })
    .strict(),
});

const updateReview = z.object({
  body: z
    .object({
      rating: z
        .number({ error: "Rating should be a number" })
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5")
        .optional(),
      comment: z
        .string({ error: "Comment should be a text" })
        .min(1, "Comment is required")
        .optional(),
    })
    .strict(),
});

export const ReviewSchemas = {
  createReview,
  updateReview,
};
