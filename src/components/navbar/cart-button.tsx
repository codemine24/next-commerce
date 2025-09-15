"use client";

import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { CartDrawer } from "@/app/(main)/shop/_components/cart-drawer";
import { useCart } from "@/hooks/use-cart";
import { CartIcon } from "@/icons/cart-icon";

export const CartButton = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { cart } = useCart();

  return (
    <>
      <Button
        onClick={() => setOpenDrawer(true)}
        startIcon={
          <Badge
            color="primary"
            showZero
            badgeContent={cart?.cart_items?.length || 0}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <CartIcon />
          </Badge>
        }
        sx={{
          px: 2,
          height: "100%",
          minHeight: 0,
          borderRadius: 0,
          color: "text.primary",
        }}
      >
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          Cart
        </Typography>
      </Button>
      <CartDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
    </>
  );
};
