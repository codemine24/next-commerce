import z from "zod";
import { createAddress } from "../address/address.schema";
import { DeliveryMethod, PaymentType } from "@prisma/client";

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

export const OrderSchemas = {
  placeOrderForRegisteredUser,
};
