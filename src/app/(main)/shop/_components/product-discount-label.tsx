"use client";

import { Chip } from "@mui/material";

import { Product } from "@/interfaces/product";

interface ProductDiscountLabelProps {
  product: Product;
}

export const ProductDiscountLabel = ({
  product,
}: ProductDiscountLabelProps) => {
  // Out of stock case

  if (product.stock <= 0) {
    return (
      <Chip
        label="Out of Stock"
        color="error"
        size="small"
        sx={{
          position: "absolute",
          borderRadius: 0,
          top: 8,
          left: 8,
          fontWeight: 600,
        }}
      />
    );
  }

  //Discount calculation
  const regularPrice = Number(product.price);
  const discountPrice = Number(product.discount_price);

  // Check if both prices are valid
  if (!regularPrice || !discountPrice || discountPrice >= regularPrice) {
    return null;
  }
  const discountPercent = Math.round(
    ((regularPrice - discountPrice) / regularPrice) * 100
  );

  return (
    <Chip
      label={`${discountPercent}%`}
      color="primary"
      size="small"
      sx={{
        position: "absolute",
        borderRadius: 0,
        top: 8,
        left: 8,
        fontWeight: 600,
      }}
    />
  );
};
