import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number().min(1, "Please provide a rating"),
  comment: z.string().min(5, "Review must be at least 5 characters"),
});

export type ReviewSchemaType = z.infer<typeof reviewSchema>;
