import z from "zod";

export const advertisementSchema = z.object({
  name: z
    .string({ error: "Banner name is required" })
    .min(1, "Banner name is required"),
  type: z.string().optional(),
  image: z
    .string({ error: "Banner image is required" })
    .min(1, "Banner image is required"),
  title: z.string().optional(),
  sub_title: z.string().optional(),
  button_text: z.string().optional(),
  url: z.url({ error: "Please provide a valid URL" }).optional(),
});

export type AdvertisementSchema = z.infer<typeof advertisementSchema>;
