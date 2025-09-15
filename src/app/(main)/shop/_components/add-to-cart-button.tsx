"use client";

import Button from "@mui/material/Button";

import { Product } from "@/interfaces/product";
import { useCart } from "@/providers/cart-provider";

export const AddToCartButton = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <Button
      onClick={() => addToCart(product)}
      variant="soft"
      color="primary"
      fullWidth
    >
      Add to Cart
    </Button>
  );
};
