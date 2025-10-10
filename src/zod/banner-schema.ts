import z from "zod";

export const bannerSchema = z.object({
  name: z
    .string({ error: "Banner name is required" })
    .min(1, "Banner name is required"),
  type: z.string().optional(),
  image: z
    .string({ error: "Image path is required" })
    .min(1, "Image path is required"),
  title: z.string().optional(),
  sub_title: z.string().optional(),
  button_text: z.string().optional(),
  url: z.url({ error: "Please provide a valid URL" }).optional(),
});

export type BannerSchema = z.infer<typeof bannerSchema>;
