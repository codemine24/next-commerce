import { z } from "zod";

const categoryBaseSchema = z
  .object({
    title: z
      .string({
        error: "Category title should be a text",
      })
      .min(1, "Category title is required"),
    description: z
      .string({ error: "Category description should be a text" })
      .optional(),
    parent_id: z
      .uuid({
        error: "Category parent id should be a valid uuid",
      })
      .optional()
      .nullable(),
    icon: z.string({ error: "Category icon should be a path" }).optional(),
    featured: z.boolean().default(false)
  })
  .strict();

const addCategory = z.object({
  body: categoryBaseSchema,
});

const updateCategory = z.object({
  body: categoryBaseSchema.partial(),
});

export const CategorySchemas = {
  addCategory,
  updateCategory,
};
