import { BeneficiaryType, DiscountType } from "@prisma/client";
import z from "zod";

const createCoupon = z.object({
  body: z
    .object({
      code: z
        .string({
          error: "Coupon code should be a text",
        })
        .min(1, "Coupon code must be required"),
      discount_type: z
        .enum(Object.values(DiscountType) as [string, ...string[]])
        .optional(),
      discount_value: z
        .number({
          error: "Discount value should be a number",
        })
        .refine((value) => value > 0, {
          message: "Discount value must be a positive number",
        }),
      maximum_value: z
        .number({
          error: "Maximum value should be a number",
        })
        .refine((value) => value > 0, {
          message: "Maximum value must be a positive number",
        })
        .optional(),
      start_date: z
        .string({ error: "Start date should be a text. e.g. 2023-12-31" })
        .optional(),
      expiration_date: z.string({
        error: "Expiration date should be a text. e.g. 2023-12-31",
      }),
      usage_limit: z
        .number({
          error: "Usage limit should be a number",
        })
        .refine((value) => value > 0, {
          message: "Usage limit must be a positive number",
        })
        .optional(),
      per_user_limit: z
        .number({
          error: "Per user limit should be a number",
        })
        .refine((value) => value > 0, {
          message: "Per user limit must be a positive number",
        })
        .optional(),
      min_order_amount: z
        .number({
          error: "Minimum order amount should be a number",
        })
        .refine((value) => value > 0, {
          message: "Minimum order amount must be a positive number",
        })
        .optional(),
      beneficiary_type: z
        .enum(Object.values(BeneficiaryType) as [string, ...string[]])
        .optional(),
      eligible_categories: z
        .array(z.uuid({ error: "Category ID should be a valid uuid" }))
        .optional(),
      eligible_brands: z
        .array(z.uuid({ error: "Brand ID should be a valid uuid" }))
        .optional(),
      eligible_products: z
        .array(z.string({ error: "Product ID should be a valid uuid" }))
        .optional(),
    })
    .strict(),
});

const updateCoupon = z.object({
  body: z
    .object({
      code: z
        .string({
          error: "Coupon code should be a text",
        })
        .min(1, "Coupon code must be required")
        .optional(),
      discount_type: z
        .enum(Object.values(DiscountType) as [string, ...string[]])
        .optional(),
      discount_value: z
        .number({
          error: "Discount value should be a number",
        })
        .refine((value) => value > 0, {
          message: "Discount value must be a positive number",
        })
        .optional(),
      maximum_value: z
        .number({
          error: "Maximum value should be a number",
        })
        .refine((value) => value > 0, {
          message: "Maximum value must be a positive number",
        })
        .optional(),
      start_date: z.string().optional(),
      expiration_date: z
        .string({
          error: "Expiration date should be a text. e.g. 2023-12-31",
        })
        .optional(),
      usage_limit: z
        .number({
          error: "Usage limit should be a number",
        })
        .refine((value) => value > 0, {
          message: "Usage limit must be a positive number",
        })
        .optional(),
      per_user_limit: z
        .number({
          error: "Per user limit should be a number",
        })
        .refine((value) => value > 0, {
          message: "Per user limit must be a positive number",
        })
        .optional(),
      min_order_amount: z
        .number({
          error: "Minimum order amount should be a number",
        })
        .refine((value) => value > 0, {
          message: "Minimum order amount must be a positive number",
        })
        .optional(),
      beneficiary_type: z
        .enum(Object.values(BeneficiaryType) as [string, ...string[]])
        .optional(),
      eligible_categories: z
        .array(z.uuid({ error: "Category ID should be a valid uuid" }))
        .optional(),
      eligible_brands: z
        .array(z.uuid({ error: "Brand ID should be a valid uuid" }))
        .optional(),
      eligible_products: z
        .array(z.string({ error: "Product ID should be a valid uuid" }))
        .optional(),
    })
    .strict(),
});

export const CouponSchemas = { createCoupon, updateCoupon };
