import { DeliveryMethod, PaymentType } from "@prisma/client";
import z from "zod";

import { addressSchema } from "./address-schema";

export const orderSchema = z.object({
    address: addressSchema,
    address_id: z
        .uuid({ error: "Address id should be a valid uuid" })
        .optional()
        .nullable(),
    payment_type: z
        .enum(Object.values(PaymentType))
        .optional(),
    delivery_method: z
        .enum(Object.values(DeliveryMethod))
        .optional(),
    coupon_code: z.string().optional(),
    comment: z.string().optional(),
})

export type Order = z.infer<typeof orderSchema>;