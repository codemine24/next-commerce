"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";

import { NotDataFound } from "@/components/not-data-found";
import { useCart } from "@/hooks/use-cart";

import { SectionTitle } from "../../_components/section-title";

import { CartItemsTable } from "./cart-items-table";
import { CartTotal } from "./cart-total";


export const CartPageContainer = () => {
  const { cart } = useCart();

  return (
    <Box mt={2}>
      <SectionTitle title="Cart" />

      {/* Empty Cart */}
      {cart?.cart_items.length === 0 && (
        <NotDataFound
          message="Your cart is empty"
          action={
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              component={Link}
              href="/"
            >
              Continue Shopping
            </Button>
          }
        />
      )}

      {/* Cart Items */}
      {cart?.cart_items.length > 0 && (
        <>
          {/* Table */}
          <CartItemsTable />

          {/* Total */}
          <CartTotal />
        </>
      )}

      {/* Action Buttons */}
      <Stack direction="row" justifyContent="end" gap={3} mt={3}>
        <Button
          variant="contained"
          sx={{ bgcolor: "common.black" }}
          component={Link}
          href="/"
        >
          Continue Shopping
        </Button>
        <Button
          variant="contained"
          component={Link}
          href="/checkout"
        >
          Confirm Order
        </Button>
      </Stack>
    </Box>
  );
};
