import {
  DeliveryMethod,
  OrderStatus,
  PaymentStatus,
  PaymentType,
} from "@prisma/client";
import z from "zod";

import { addressSchema } from "../address/address.schema";

const placeOrderForRegisteredUser = z.object({
  body: z
    .object({
      address: addressSchema.strict().optional().nullable(),
      address_id: z
        .uuid({
          error: "Address id should be a valid uuid",
        })
        .optional()
        .nullable(),
      payment_type: z
        .enum(
          Object.values(PaymentType),
          `Invalid payment type. Expected: ${Object.values(PaymentType).join(
            " or "
          )}`
        )
        .optional(),
      delivery_method: z
        .enum(
          Object.values(DeliveryMethod),
          `Invalid delivery method. Expected: ${Object.values(
            DeliveryMethod
          ).join(" or ")}`
        )
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
      address: addressSchema.strict().optional().nullable(),
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
        .enum(
          Object.values(PaymentType),
          `Invalid payment type. Expected: ${Object.values(PaymentType).join(
            " or "
          )}`
        )
        .optional(),
      delivery_method: z
        .enum(
          Object.values(DeliveryMethod),
          `Invalid delivery method. Expected: ${Object.values(
            DeliveryMethod
          ).join(" or ")}`
        )
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

const updateOrderByAdmin = z.object({
  body: z
    .object({
      payment_type: z
        .enum(
          Object.values(PaymentType),
          `Invalid payment type. Expected: ${Object.values(PaymentType).join(
            " or "
          )}`
        )
        .optional(),
      delivery_method: z
        .enum(
          Object.values(DeliveryMethod),
          `Invalid delivery method. Expected: ${Object.values(
            DeliveryMethod
          ).join(" or ")}`
        )
        .optional(),
      order_status: z
        .enum(Object.values(OrderStatus) as [string, ...string[]])
        .optional(),
      payment_status: z
        .enum(Object.values(PaymentStatus) as [string, ...string[]])
        .optional(),
      comment: z.string({ error: "Comment should be a text" }).optional(),
      order_history: z
        .object({
          remark: z.string().optional(),
        })
        .optional(),
      shipped_info: z
        .object({
          courier_id: z.uuid({
            error: "Courier ID should be a valid uuid",
          }),
          tracking_id: z
            .string({
              error: "Tracking ID should be a text",
            })
            .min(1, "Tracking ID is required"),
        })
        .optional()
        .nullable(),
      refund_info: z
        .object({
          penalty_charge: z
            .number({ error: "Penalty charge should be a number" })
            .nonnegative({ message: "Penalty charge should be greater than 0" })
            .default(0)
            .optional(),
        })
        .optional()
        .nullable(),
    })
    .strict(),
});

const updateOrderByCustomer = z.object({
  body: z
    .object({
      payment_type: z
        .enum(
          Object.values(PaymentType),
          `Invalid payment type. Expected: ${Object.values(PaymentType).join(
            " or "
          )}`
        )
        .optional(),
      delivery_method: z
        .enum(
          Object.values(DeliveryMethod),
          `Invalid delivery method. Expected: ${Object.values(
            DeliveryMethod
          ).join(" or ")}`
        )
        .optional(),
      comment: z.string({ error: "Comment should be a text" }).optional(),
      address: addressSchema.partial().strict().optional().nullable(),
      address_id: z
        .uuid({
          error: "Address id should be a valid uuid",
        })
        .optional()
        .nullable(),
    })
    .strict(),
});

export const OrderSchemas = {
  placeOrderForRegisteredUser,
  placeOrderForGuestUser,
  updateOrderByAdmin,
  updateOrderByCustomer,
};
