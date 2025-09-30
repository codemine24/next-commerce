"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

import { NotDataFound } from "@/components/not-data-found";
import { useCart } from "@/hooks/use-cart";

import { SectionTitle } from "../../_components/section-title";

import { CartItems } from "./cart-items";
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
          <CartItems />

          {/* Total */}
          <CartTotal />
        </>
      )}

      {/* Discount */}
      {/* <Box my={3}>
        <Typography variant="h4">What would you like to do next?</Typography>
        <Typography variant="body1" color="text.secondary" mt={1}>
          Choose if you have a discount code or reward points you want to use or
          would like to estimate your delivery cost.
        </Typography>
      </Box> */}

      {/* Promo  */}
      {/* <Stack
        direction="row"
        spacing={3}
        mb={4}
        sx={{
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
          px: 3,
          py: 4,
          borderRadius: BORDER_RADIUS.default,
        }}
      >
        <Stack direction="row" spacing={1} flex="1">
          <TextField
            fullWidth
            placeholder="Promo / Coupon code"
            size="small"
            sx={{
              [`& .${inputBaseClasses.root}`]: {
                bgcolor: "common.white",
              },
              [`& .${inputBaseClasses.input}`]: {
                p: "5px 14px",
                bgcolor: "common.white",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              whiteSpace: "nowrap",
              bgcolor: "common.black",
              px: 4,
            }}
          >
            Apply Coupon
          </Button>
        </Stack>
        <Stack direction="row" spacing={1} flex="1">
          <TextField
            fullWidth
            placeholder="Promo / Coupon code"
            size="small"
            sx={{
              [`& .${inputBaseClasses.root}`]: {
                bgcolor: "common.white",
              },
              [`& .${inputBaseClasses.input}`]: {
                p: "5px 14px",
                bgcolor: "common.white",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              whiteSpace: "nowrap",
              bgcolor: "common.black",
              px: 4,
            }}
          >
            Apply Voucher
          </Button>
        </Stack>
      </Stack> */}

      {/* Action Buttons */}
      {/* <Stack direction="row" justifyContent="space-between">
        <Button variant="contained">Continue Shopping</Button>
        <Button variant="contained">Confirm Order</Button>
      </Stack> */}
    </Box>
  );
};
