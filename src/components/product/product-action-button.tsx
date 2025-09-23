"use client";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";

import { ProductQuantityButton } from "@/components/product-quantity-button";
import { useCart } from "@/hooks/use-cart";
import { CartIcon } from "@/icons/cart-icon";
import { HeartEmptyIcon } from "@/icons/heart-empty";
import { Product } from "@/interfaces/product";

interface ProductActionButtonProps {
  product: Product;
}

export const ProductActionButton = ({ product }: ProductActionButtonProps) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        slug: product.slug,
        thumbnail: product.thumbnail,
      },
      qty
    );
  };

  return (
    <Box mt={4}>
      <Typography fontSize={16} fontWeight={400} mb={1}>
        Quantity
      </Typography>
      <ProductQuantityButton
        qty={qty}
        onAdd={() => setQty(qty + 1)}
        onRemove={() => setQty(qty - 1)}
      />
      <Stack direction="row" spacing={1} alignItems="center" mt={4}>
        <Button
          startIcon={<CartIcon />}
          variant="contained"
          sx={{ height: 50, flexGrow: 1 }}
        >
          Add to cart
        </Button>
        <Button
          startIcon={<HeartEmptyIcon />}
          variant="contained"
          sx={{ height: 50, flexGrow: 1 }}
        >
          Add to Wishlist
        </Button>
      </Stack>
    </Box>
  );
};
