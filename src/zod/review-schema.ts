import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Please provide a rating")
    .max(5, "Max rating is 5"),
  comment: z.string().min(1, "Comment is required"),
});

export type ReviewSchemaType = z.infer<typeof reviewSchema>;
