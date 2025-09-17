"use client";

import { IconButton } from "@mui/material";

import { useCart } from "@/hooks/use-cart";
import { CartIcon } from "@/icons/cart-icon";

type Product = {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  discount_price: number;
};

export const AddToCartIconButton = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <IconButton
      onClick={handleAddToCart}
      sx={{
        bgcolor: "primary.light",
        transform: "translateY(-10px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        color: "primary.contrastText",
        "&:hover": {
          bgcolor: "primary.light",
        },
      }}
    >
      <CartIcon fontSize="small" />
    </IconButton>
  );
};
