import { z } from "zod";

export const categorySchema = z
    .object({
        title: z
            .string({ error: "Category title is required" })
            .min(2, "Category title must be at least 2 characters long")
            .max(100, "Category title must be at most 100 characters long"),
        code: z
            .string()
            .optional(),
        description: z
            .string()
            .optional(),
        parent_id: z
            .string()
            .optional()
            .nullable(),
        icon: z
            .union([z.instanceof(File), z.string()])
            .optional(),
    })
    .refine((data) => {
        if (data.icon instanceof File) {
            return data.icon.type.startsWith("image/");
        }
        return true;
    }, "Icon must be an image");

export type CategorySchema = z.infer<typeof categorySchema>;