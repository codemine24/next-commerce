import { z } from "zod";

export const brandSchema = z
    .object({
        name: z
            .string({ error: "Brand name is required" })
            .min(3, "Brand name must be at least 3 characters long")
            .max(100, "Brand name must be at most 100 characters long"),
        code: z
            .string()
            .optional(),
        description: z
            .string()
            .optional(),
        icon: z.union([z.instanceof(File), z.string()]).optional(),
    })
    .refine((data) => {
        if (data.icon instanceof File) {
            return data.icon.type.startsWith("image/");
        }
        return true;
    }, "Icon must be an image");

export type BrandSchema = z.infer<typeof brandSchema>;