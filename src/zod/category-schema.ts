import { z } from "zod";

export const categorySchema = z
    .object({
        title: z
            .string({ error: "Category title is required" })
            .min(1, "Category title is required"),
        code: z
            .string({ error: "Category code is required" })
            .transform((val) => val.toUpperCase())
            .optional(),
        description: z
            .string({ error: "Category description is required" })
            .optional(),
        parent_id: z
            .uuid({ error: "Category parent id is required" })
            .optional()
            .nullable(),
        icon: z.instanceof(File).optional(),
    });

export type CategorySchema = z.infer<typeof categorySchema>;