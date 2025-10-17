import z from "zod";

export const advertiseSchema = z
  .object({
    name: z
      .string({ error: "Advertise name is required" })
      .min(1, "Advertise name is required"),
    type: z.string().optional(),
    image: z
      .string({ error: "Advertise image is required" })
      .min(1, "Advertise image is required"),
    title: z.string().optional(),
    sub_title: z.string().optional(),
    button_text: z.string().optional(),
    url: z.url({ error: "Please provide a valid URL" }).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.button_text && !data.url) {
      ctx.addIssue({
        code: "custom",
        path: ["url"],
        message: "Please provide a button URL",
      });
    }
  });

export type AdvertiseSchema = z.infer<typeof advertiseSchema>;
