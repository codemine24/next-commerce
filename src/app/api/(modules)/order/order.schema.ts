import { DeliveryMethod, PaymentType } from "@prisma/client";
import z from "zod";

import { uuidRegex } from "../../(helpers)/constants/common";
import { addressSchema } from "../address/address.schema";

const orderSchemaForRegisteredUser = z.object({
    address: z.any(),
    address_id: z
        .string()
        .regex(uuidRegex, "Invalid address id")
        .optional()
        .nullable(),
    payment_type: z.enum(Object.values(PaymentType)).optional(),
    delivery_method: z.enum(Object.values(DeliveryMethod)).optional(),
    coupon_id: z.string().optional(),
    comment: z.string().optional(),
}).superRefine((data, ctx) => {
    const hasAddressId = !!data.address_id;

    if (!hasAddressId) {
        // Validate addressSchema
        const result = addressSchema.strict().safeParse(data.address);

        if (!result.success) {
            for (const issue of result.error.issues) {
                ctx.addIssue({
                    path: ['address', ...issue.path],
                    message: issue.message,
                    code: "custom"
                });
            }
        }
    }
});


const orderSchemaForGuestUser = z.object({
    address: addressSchema.strict(),
    payment_type: z.enum(Object.values(PaymentType)).optional(),
    delivery_method: z.enum(Object.values(DeliveryMethod)).optional(),
    coupon_id: z.string().optional(),
    comment: z.string().optional(),
    order_items: z.array(
        z.object({
            product_id: z
                .string()
                .regex(uuidRegex, "Invalid Product id"),
            quantity: z
                .number()
                .nonnegative({ message: "Quantity must be a positive number" })
                .optional(),
        }).strict()
    ).nonempty("Order items are required"),
})

export const OrderSchema = {
    createOrderSchemaForRegisteredUser: z.object({
        body: orderSchemaForRegisteredUser,
    }).strict(),
    createOrderSchemaForGuestUser: z.object({
        body: orderSchemaForGuestUser,
    }).strict(),
}
