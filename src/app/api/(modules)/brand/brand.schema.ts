import { z } from "zod";

const brandBaseSchema = z
  .object({
    name: z
      .string({
        error: "Brand name should be a text",
      })
      .min(1, "Brand name is required"),
    code: z
      .string({
        error: "Brand code should be a text",
      })
      .transform((val) => val.toUpperCase())
      .optional(),
    description: z
      .string({ error: "Brand description should be a text" })
      .optional(),
    icon: z.string({ error: "Brand icon should be a path" }).optional(),
  })
  .strict();

const addBrand = z.object({
  body: brandBaseSchema,
});

const updateBrand = z.object({
  body: brandBaseSchema.strict().partial(),
});

export const BrandSchemas = {
  addBrand,
  updateBrand,
};
