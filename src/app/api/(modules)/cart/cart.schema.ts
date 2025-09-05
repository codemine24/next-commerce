import z from "zod";

const addToCart = z.object({
  body: z
    .object({
      product_id: z.uuid({
        error: "Product id should be a valid uuid",
      }),
      quantity: z
        .number({
          error: "Quantity should be a number",
        })
        .nonnegative({ error: "Quantity should not be negative" })
        .default(1)
        .optional(),
    })
    .strict(),
});

const updateCartItem = z.object({
  body: z
    .object({
      quantity: z
        .number({ error: "Quantity should be a number" })
        .nonnegative({ error: "Quantity should not be negative" })
        .optional(),
    })
    .strict(),
});

export const CartSchemas = {
  addToCart,
  updateCartItem,
};
