import z from "zod";

const addProduct = z.object({
  body: z.object({
    name: z.string().min(1, "Product name is required"),
    slug: z.string().min(1, "Slug is required"),
    model: z.string().optional(),
    brand_id: z.string().optional(),
    size: z.string().optional(),
    color: z.string().optional(),
    tags: z.array(z.string()).optional(),
    product_code: z.string().optional(),
    warranty: z.string().optional(),
    stock: z.number().int().nonnegative().optional(),
    price: z.number().int({ message: "Price must be an integer" }),
    discount_price: z.number().int().optional(),
    thumbnail: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    description: z.string().optional(),
    specification: z.string().optional(),
    additional_information: z.string().optional(),
    key_features: z.array(z.string()).optional(),
    video_url: z.string().url().optional(),
  }),
});

export const ProductSchemas = {
  addProduct,
};
