"use client";

import Button from "@mui/material/Button";

import { useCart } from "@/hooks/use-cart";
import { Product } from "@/interfaces/product";

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
