import { BeneficiaryType, DiscountType } from "@prisma/client";
import { z } from "zod";

import { uuidRegex } from "../../(helpers)/constants/common";

const createCouponValidationSchema = z.object({
    body: z
        .object({
            code: z
                .string({ error: "Coupon code is required" })
                .min(4, "Coupon code must be at least 4 characters long"),
            discount_type: z
                .enum(Object.values(DiscountType))
                .optional(),
            discount_value: z
                .number({ error: "Discount value is required" })
                .refine((value) => value > 0, {
                    message: "Discount value must be a positive number",
                }),
            maximum_value: z
                .number({ error: "Maximum value is required" })
                .refine((value) => value > 0, {
                    message: "Maximum value must be a positive number",
                })
                .optional(),
            start_date: z.date().optional(),
            expiration_date: z
                .date({ error: "Expiration date is required" })
                .refine(
                    (value) => new Date(value) > new Date(),
                    "Date must be in the future"
                ),
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
            min_product_amount: z
                .number()
                .refine((value) => value > 0, {
                    message: "Minimum product amount must be a positive number",
                })
                .optional(),
            beneficiary_type: z
                .enum(Object.values(BeneficiaryType))
                .optional(),
            eligible_categories: z
                .array(
                    z
                        .string({ error: "Category id must be a uuid" })
                        .regex(uuidRegex, "Invalid category ID")
                )
                .optional(),
            eligible_brands: z
                .array(
                    z
                        .string({ error: "Brand id must be a uuid" })
                        .regex(uuidRegex, "Invalid brand ID")
                )
                .optional(),
            eligible_products: z
                .array(
                    z
                        .string({ error: "Product id must be a uuid" })
                        .regex(uuidRegex, "Invalid product ID")
                )
                .optional(),
        })
        .strict(),
}).superRefine((data, ctx) => {
    if (data.body.discount_type === DiscountType.PERCENTAGE && data.body.discount_value > 100) {
        ctx.addIssue({
            code: "custom",
            path: ["discount_value"],
            message: "Discount value must be less than or equal to 100 %",
        });
    }
});

export const CouponValidations = {
    createCouponValidationSchema,
}