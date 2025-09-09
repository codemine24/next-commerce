"use client";
import { CartDrawer } from "@/app/(main)/shop/_components/cart-drawer";
import { CartIcon } from "@/icons/cart-icon";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export const CartButton = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpenDrawer(true)}
        startIcon={
          <Badge
            color="primary"
            showZero
            badgeContent={0}
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
