"use client";

import Button from "@mui/material/Button";
import { useState } from "react";

import { ProductQuickView } from "@/components/product/product-quick-view";
import { EyeIcon } from "@/icons/eye";
import { Product } from "@/interfaces/product";

export const ProductQuickViewButton = ({ product }: { product: Product }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="soft"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          border: "none",
          px: 1,
        }}
      >
        <EyeIcon sx={{ color: "primary.main", fontSize: 20 }} />
      </Button>
      <ProductQuickView open={open} onClose={() => setOpen(false)} product={product} />
    </>
  );
};
