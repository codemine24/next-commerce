import z from "zod";

const addToWishlist = z.object({
  body: z
    .object({
      product_id: z.uuid({
        error: "Product id should be a valid uuid",
      }),
    })
    .strict(),
});

export const WishlistSchemas = {
  addToWishlist,
};
