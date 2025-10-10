import z from "zod";

const postBaseSchema = {
  title: z
    .string({ error: "Title should be a text" })
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  content: z
    .string({ error: "Content should be a text" })
    .min(1, { message: "Content is required" }),
  tags: z.array(z.string({ error: "Tag should be a text" })).default([]),
  thumbnail: z.string({ error: "Thumbnail should be a path/url" }).optional(),
  images: z.array(z.string({ error: "Image should be a path/url" })).optional(),
};

export const createPost = z.object({
  body: z.object(postBaseSchema).strict(),
});

export const updatePost = z.object({
  body: z
    .object({
      ...Object.fromEntries(
        Object.entries(postBaseSchema).map(([key, value]) => [
          key,
          value.optional(),
        ])
      ),
      published: z
        .boolean({ error: "Published should be true or false" })
        .optional(),
      featured: z
        .boolean({ error: "Featured should be true or false" })
        .optional(),
    })
    .strict(),
});

export const BlogSchemas = {
  createPost,
  updatePost,
};
