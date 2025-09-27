import { CampaignPlatform } from "@prisma/client";
import z from "zod";

export const campaignSchema = z.object({
    title: z
        .string({ error: "Title is required" })
        .min(4, "Title must be at least 4 characters long")
        .max(100, "Title must not exceed 100 characters"),
    sub_title: z
        .string()
        .optional()
        .nullable(),
    description: z
        .string()
        .optional()
        .nullable(),
    thumbnail: z
        .string({ error: "Thumbnail is required" })
        .min(1, "Thumbnail is required"),
    start_at: z
        .string()
        .refine((value) => {
            const inputDate = new Date(value);
            const today = new Date();

            // normalize both dates to YYYY-MM-DD (ignoring time)
            inputDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            return inputDate >= today;
        }, "Start date must be today or in the future"),
    end_at: z
        .string()
        .refine((value) => {
            const inputDate = new Date(value);
            const today = new Date();

            // normalize both dates to YYYY-MM-DD (ignoring time)
            inputDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            return inputDate >= today;
        }, "End date must be today or in the future"),
    platform: z
        .enum(Object.values(CampaignPlatform))
        .optional(),
    conditions: z
        .array(z.string({ error: "This field is required" }))
        .optional(),
    note: z.string().optional().nullable(),
    eligible_categories: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .optional(),
    eligible_brands: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .optional(),
    eligible_products: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .optional(),
})
    .strict()
    .superRefine((val, ctx) => {
        const start = Date.parse(val.start_at);
        const end = Date.parse(val.end_at);

        if (!Number.isNaN(start) && !Number.isNaN(end) && end < start) {
            ctx.addIssue({
                code: "custom",
                path: ["end_at"],
                message: "End date must be later than start date",
            });
        }
    })

export type CampaignSchema = z.infer<typeof campaignSchema>;