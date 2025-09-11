"use client";

import { ProductQuantityButton } from "@/components/product-quantity-button";
import { CartIcon } from "@/icons/cart-icon";
import { HeartEmptyIcon } from "@/icons/heart-empty";
import { Alert, Snackbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";

interface ProductActionButtonProps {
  open: boolean;
  onClose: () => void;
}

export const ProductActionButton = ({
  open,
  onClose,
}: ProductActionButtonProps) => {
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    onClose();
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
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
          sx={{ width: 200, height: 50 }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button
          startIcon={<HeartEmptyIcon />}
          variant="soft"
          color="primary"
          sx={{ width: 200, height: 50 }}
          onClick={handleAddToCart}
        >
          Add to Wish List
        </Button>
      </Stack>
    </Box>
  );
};
