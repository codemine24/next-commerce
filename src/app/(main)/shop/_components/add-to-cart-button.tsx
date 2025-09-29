"use client";

import Button from "@mui/material/Button";

import { useCart } from "@/hooks/use-cart";
import { Product } from "@/interfaces/product";

export const AddToCartButton = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <Button
      onClick={() => addToCart({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.discount_price || product.price,
        thumbnail: product.thumbnail,
      })}
      variant="soft"
      color="primary"
      fullWidth
    >
      Add to Cart
    </Button>
  );
};
