import { z } from "zod";

export const productSchema = z.object({
    name: z
        .string({ error: "Product name is required" })
        .min(3, "Product name must be at least 3 characters long")
        .max(100, "Product name must not exceed 100 characters"),
    model: z.string().optional(),
    brand_id: z.string().optional(),
    size: z.string().optional(),
    color: z.string().optional(),
    tags: z.array(z.string()).optional(),
    product_code: z.string().optional(),
    warranty: z.string().optional(),
    stock: z
        .number()
        .int({ error: "Stock should not be a fraction" })
        .nonnegative({ error: "Stock should not be negative" })
        .optional(),
    price: z
        .number({ error: "Price is required" })
        .nonnegative({ error: "Price should not be negative" }),
    discount_price: z
        .number()
        .nonnegative({ error: "Discount price should not be negative" })
        .optional(),
    thumbnail: z.union([z.string(), z.null()]).optional(),
    gallery: z
        .array(z.union([z.string(), z.null()]))
        .optional(),
    description: z.string().optional(),
    specification: z.string().optional(),
    additional_information: z.string().optional(),
    key_features: z.array(z.string({ error: "Key feature is required" }).min(3, "Key feature must be at least 3 characters long")).optional(),
    video_url: z.url({ error: "Video url should be a valid url" }).optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;