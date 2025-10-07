"use client";

import Button from "@mui/material/Button";
import { useState } from "react";

import { ProductQuickView } from "@/components/product/product-quick-view";
import { Product } from "@/interfaces/product";
import { BORDER_RADIUS } from "@/theme";

export const ProductQuickViewButton = ({ product }: { product: Product }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          color: "text.primary",
          fontSize: ".85rem",
          bgcolor: "rgb(235 236 237)",
          px: 1,
          flexGrow: 1,
          borderRadius: BORDER_RADIUS.default,
          boxShadow: "none",
          transition: "all 0.3s",
          "&:hover": {
            bgcolor: "primary.dark",
            color: "common.white",
          },
        }}
      >
        Quick view
      </Button>
      <ProductQuickView
        open={open}
        onClose={() => setOpen(false)}
        product={product}
      />
    </>
  );
};
