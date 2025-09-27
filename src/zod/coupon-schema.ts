import { BeneficiaryType, DiscountType } from "@prisma/client";
import { z } from "zod";

export const couponSchema = z.object({
    code: z.string({ error: "Coupon code is required" }).min(1, "Coupon code is required"),
    discount_type: z.enum(Object.values(DiscountType), { error: "Discount type is required" }),
    discount_value: z
        .number({ error: "Discount value is required" })
        .refine((value) => value > 0, {
            message: "Discount value must be a positive number",
        }),
    maximum_value: z
        .number()
        .refine((value) => value > 0, {
            message: "Maximum value must be a positive number",
        })
        .optional(),
    start_date: z.string().min(1, "Start date is required"),
    expiration_date: z.string().min(1, "Expiration date is required"),
    usage_limit: z
        .number()
        .refine((value) => value > 0, {
            message: "Usage limit must be a positive number",
        })
        .optional(),
    per_user_limit: z
        .number()
        .refine((value) => value > 0, {
            message: "Per user limit must be a positive number",
        })
        .optional(),
    min_order_amount: z
        .number()
        .refine((value) => value > 0, {
            message: "Minimum order amount must be a positive number",
        })
        .optional(),
    beneficiary_type: z
        .enum(Object.values(BeneficiaryType))
        .optional(),
    eligible_categories: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .optional(),
    eligible_brands: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .optional(),
    eligible_products: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .optional(),
}).superRefine((data, ctx) => {
    if (data.discount_type === DiscountType.PERCENTAGE && data.discount_value > 100) {
        ctx.addIssue({
            code: "custom",
            message: "Discount value must be less than 100",
            path: ["discount_value"],
        });
    }

    if (data.start_date && data.expiration_date && data.expiration_date < data.start_date) {
        ctx.addIssue({
            code: "custom",
            message: "Expiration date must be greater than start date",
            path: ["expiration_date"],
        });
    }
})

export type CouponSchema = z.infer<typeof couponSchema>