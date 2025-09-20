import z from "zod";

// Define the base product schema (common fields for add/update)
const baseProductSchema = {
  name: z
    .string({ error: "Product name is required" })
    .min(1, "Product name is required"),
  model: z.string({ error: "Model should be a text" }).optional(),
  brand_id: z.uuid({ error: "Brand id should be a valid uuid" }).optional(),
  categories: z
    .array(z.uuid({ error: "Category id should be a valid uuid" }))
    .optional(),
  size: z.string({ error: "Size should be a text" }).optional(),
  color: z.string({ error: "Color should be a text" }).optional(),
  tags: z
    .array(z.string({ error: "Tags should be a text" }), {
      error: "Tags should be an array of strings",
    })
    .optional(),
  product_code: z.string({ error: "Product code should be a text" }).optional(),
  warranty: z.string({ error: "Warranty should be a text" }).optional(),
  stock: z
    .number({ error: "Stock should be a positive number" })
    .int({ error: "Stock should not be a fraction" })
    .nonnegative({ error: "Stock should not be negative" })
    .optional(),
  price: z
    .number({ error: "Price is required" })
    .nonnegative({ error: "Price should not be negative" }),
  discount_price: z
    .number({ error: "Discount price should be a positive number" })
    .nonnegative({ error: "Discount price should not be negative" })
    .optional(),
  thumbnail: z.string({ error: "Thumbnail should be a valid url" }).optional(),
  gallery: z
    .array(z.string({ error: "Gallery item should be a valid url" }), {
      error: "Gallery should be an array of valid urls",
    })
    .optional(),
  description: z.string({ error: "Description should be a text" }).optional(),
  specification: z
    .string({ error: "Specification should be a text" })
    .optional(),
  additional_information: z
    .string({ error: "Additional information should be a text" })
    .optional(),
  key_features: z
    .array(z.string({ error: "Key feature should be a text" }), {
      error: "Key features should be an array of strings",
    })
    .optional(),
  video_url: z.url({ error: "Video url should be a valid url" }).optional(),
};

// Add Product schema (require `name` and `price`)
const addProduct = z.object({
  body: z
    .object({
      ...baseProductSchema,
      name: baseProductSchema.name, // required
      price: baseProductSchema.price, // required
    })
    .strict(),
});

// Update Product schema (all fields optional)
const updateProduct = z.object({
  body: z
    .object({
      ...Object.fromEntries(
        Object.entries(baseProductSchema).map(([k, v]) => [k, v.optional()])
      ),
    })
    .strict(),
});

export const ProductSchemas = {
  addProduct,
  updateProduct,
};
