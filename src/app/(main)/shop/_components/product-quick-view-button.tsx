"use client";

import Button from "@mui/material/Button";
import { useState } from "react";

import { EyeIcon } from "@/icons/eye";

import { ProductQuickView } from "../../../../components/product/product-quick-view";

export const ProductQuickViewButton = () => {
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
      <ProductQuickView open={open} onClose={() => setOpen(false)} />
    </>
  );
};
