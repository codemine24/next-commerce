import z from "zod";

export const blogSchema = z.object({
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
});

export type BlogSchema = z.infer<typeof blogSchema>;
