import { Platform } from "@prisma/client";
import z from "zod";

const companyReviewSchema = z.object({
  name: z.string({ error: "Name should be a text" }).min(1, "Name is required"),
  email: z.email({ error: "Enter a valid email" }).optional(),
  avatar: z.string({ error: "Avatar should be a valid image path" }).optional(),
  company: z.string({ error: "Company name should be a text" }).optional(),
  designation: z.string({ error: "Designation should be a text" }).optional(),
  rating: z
    .number({ error: "Rating should be a number" })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .default(5),
  comment: z
    .string({ error: "Comment should be a text" })
    .min(1, "Comment is required"),
  platform: z
    .enum(
      Object.values(Platform) as [string, ...string[]],
      `Invalid platform. Expected: ${Object.values(Platform).join(" or ")}`
    )
    .optional(),
});

const createCompanyReview = z.object({
  body: companyReviewSchema.strict(),
});

const updateCompanyReview = z.object({
  body: companyReviewSchema.partial().strict(),
});

export const CompanyReviewSchemas = {
  createCompanyReview,
  updateCompanyReview,
};
