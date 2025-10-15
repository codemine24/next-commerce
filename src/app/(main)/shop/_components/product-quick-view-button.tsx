"use client";

import Button from "@mui/material/Button";
import { useState } from "react";

import { ProductQuickView } from "@/components/product/product-quick-view";
import { Product } from "@/interfaces/product";
import { BORDER_RADIUS } from "@/theme";
import { EyeIcon } from "@/icons/eye";

export const ProductQuickViewButton = ({ product }: { product: Product }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="soft"
        color="primary"
        onClick={() => setOpen(true)}
      >
        <EyeIcon />
      </Button>
      <ProductQuickView
        open={open}
        onClose={() => setOpen(false)}
        product={product}
      />
    </>
  );
};
