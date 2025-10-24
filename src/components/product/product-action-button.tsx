"use client";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";

import { ProductQuantityButton } from "@/components/product-quantity-button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/interfaces/product";

import WishlistButton from "./wishlist-button";

interface ProductActionButtonProps {
  product: Product;
}

export const ProductActionButton = ({ product }: ProductActionButtonProps) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const isStock = product.stock > 0;
  

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
    <Box>
      <Box>
        <Typography fontSize={16} fontWeight={400} mb={1}>
        Quantity
      </Typography>
      <ProductQuantityButton
        qty={qty}
        onAdd={() => setQty(qty + 1)}
        onRemove={() => setQty(qty - 1)}
      />
      </Box>
      <Stack direction="row" spacing={1} alignItems="center" mt={{xs: 2, sm: 5}}>       
          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{ height: 48, flexGrow: 1 }}
            disabled={!isStock}
          >
            Buy Now
          </Button>
     
        <WishlistButton product={product} />
      </Stack>
    </Box>
  );
};