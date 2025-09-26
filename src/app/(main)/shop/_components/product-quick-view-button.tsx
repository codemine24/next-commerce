"use client";

import { alpha } from "@mui/material";
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
          color: "#08996B",
          borderColor: "#08996B",
          bgcolor: alpha("#08996B", 0.06),
          px: 1,
          width: 40,
          height: 40,
        }}
      >
        <EyeIcon sx={{ color: "primary.main", fontSize: 20 }} />
      </Button>
      <ProductQuickView
        open={open}
        onClose={() => setOpen(false)}
        product={product}
      />
    </>
  );
};
