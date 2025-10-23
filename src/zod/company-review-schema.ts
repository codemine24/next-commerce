import { z } from "zod";

export const companyReviewSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must not exceed 50 characters"),
  email: z.email({ error: "Enter a valid email" }).optional(),
  designation: z.string({ error: "Designation should be a text" }).optional(),
  rating: z
    .number({ error: "Rating should be a number" })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .default(5),
  comment: z
    .string({ error: "Comment should be a text" })
    .min(1, "Comment is required"),
});

export type CompanyReviewSchema = z.infer<typeof companyReviewSchema>;
