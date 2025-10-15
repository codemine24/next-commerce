"use client";

import { Button } from "@mui/material";
import React from "react";

import { useCart } from "@/hooks/use-cart";
import { Product } from "@/interfaces/product";

const BuyNowButton = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={() => {
        addToCart({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.discount_price || product.price,
          thumbnail: product.thumbnail,
        })
      }}
    >
      Buy Now
    </Button>
  );
};

export default BuyNowButton;
