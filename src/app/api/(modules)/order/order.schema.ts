import { DeliveryMethod, PaymentType } from "@prisma/client";
import z from "zod";

import { createAddress } from "../address/address.schema";

const placeOrderForRegisteredUser = z.object({
  body: z
    .object({
      address: createAddress.strict().optional().nullable(),
      address_id: z
        .uuid({
          error: "Address id should be a valid uuid",
        })
        .optional()
        .nullable(),
      payment_type: z
        .enum(Object.values(PaymentType) as [string, ...string[]])
        .optional(),
      delivery_method: z
        .enum(Object.values(DeliveryMethod) as [string, ...string[]])
        .optional(),
      coupon_code: z
        .string({
          error: "Coupon code should be a text",
        })
        .min(1, "Coupon code should not empty string")
        .optional(),
      comment: z.string({ error: "Comment should be a text" }).optional(),
    })
    .strict(),
});

const placeOrderForGuestUser = z.object({
  body: z
    .object({
      address: createAddress.strict().optional().nullable(),
      address_id: z
        .uuid({
          error: "Address id should be a valid uuid",
        })
        .optional()
        .nullable(),
      order_items: z
        .array(
          z
            .object({
              product_id: z.uuid({
                error: "Product id should be a valid uuid",
              }),
              quantity: z
                .number({ error: "Quantity should be a number" })
                .nonnegative({ message: "Quantity must be a positive number" })
                .optional(),
            })
            .strict(),
          { message: "Order items must be an array of objects" }
        )
        .nonempty("At least one item is required"),
      payment_type: z
        .enum(Object.values(PaymentType) as [string, ...string[]])
        .optional(),
      delivery_method: z
        .enum(Object.values(DeliveryMethod) as [string, ...string[]])
        .optional(),
      coupon_code: z
        .string({
          error: "Coupon code should be a text",
        })
        .min(1, "Coupon code should not empty string")
        .optional(),
      comment: z.string({ error: "Comment should be a text" }).optional(),
    })
    .strict()
    .superRefine((data, ctx) => {
      if (!data.address && !data.address_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Either address or address_id is required",
          path: ["address"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Either address or address_id is required",
          path: ["address_id"],
        });
      }
    }),
});

export const OrderSchemas = {
  placeOrderForRegisteredUser,
  placeOrderForGuestUser,
};
