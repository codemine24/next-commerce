import { BannerType } from "@prisma/client";
import z from "zod";

const bannerFields = {
  name: z
    .string({ error: "Banner name should be a text" })
    .min(1, "Banner name is required"),
  type: z
    .enum(
      Object.values(BannerType),
      `Invalid banner type. Expected: ${Object.values(BannerType).join(" or ")}`
    )
    .default(BannerType.BANNER),
  image: z
    .string({ error: "Image should be a valid path" })
    .min(1, "Image path is required"),
  title: z.string({ error: "Title should be a text" }).optional(),
  sub_title: z.string({ error: "Sub title should be a text" }).optional(),
  button_text: z.string({ error: "Button text should be a text" }).optional(),
  url: z.url({ error: "Button url should be a valid url" }).optional(),
};

// ✅ Create Banner Schema
export const createBanner = z.object({
  body: z.object(bannerFields).strict(),
});

// ✅ Update Banner Schema (all fields optional)
export const updateBanner = z.object({
  body: z.object(bannerFields).partial().strict(),
});

export const BannerSchemas = {
  createBanner,
  updateBanner,
};
