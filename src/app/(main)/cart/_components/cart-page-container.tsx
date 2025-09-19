"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { inputBaseClasses } from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useCart } from "@/hooks/use-cart";
import { BORDER_RADIUS } from "@/theme";
import { currencyFormatter } from "@/utils/currency-formatter";

import { SectionTitle } from "../../_components/section-title";

import { CartItems } from "./cart-items";

export const CartPageContainer = () => {
  const { cart } = useCart();
  const delivery = 60;

  return (
    <Box mt={2}>
      <SectionTitle title="Cart" />

      {/* Table */}
      <CartItems />

      {/* Total */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <Box sx={{ minWidth: 280 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
              mb: 1,
              pb: 1,
            }}
          >
            <Typography width="60%" textAlign="right">
              Subtotal:
            </Typography>
            <Typography color="primary.main">
              {currencyFormatter(cart?.cart_total)}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
              mb: 1,
              pb: 1,
            }}
          >
            <Typography width="60%" textAlign="right">
              Home Delivery:
            </Typography>
            <Typography color="primary.main">
              {" "}
              {currencyFormatter(delivery)}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ borderBottom: "1px solid", borderColor: "divider", pb: 1 }}
          >
            <Typography fontWeight={600} width="60%" textAlign="right">
              Total:
            </Typography>
            <Typography fontWeight={700} color="primary.main">
              {currencyFormatter(cart?.cart_total + delivery)}
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* Discount */}
      <Box my={3}>
        <Typography variant="h4">What would you like to do next?</Typography>
        <Typography variant="body1" color="text.secondary" mt={1}>
          Choose if you have a discount code or reward points you want to use or
          would like to estimate your delivery cost.
        </Typography>
      </Box>

      {/* Promo  */}
      <Stack
        direction="row"
        spacing={3}
        mb={4}
        sx={{
          bgcolor: "green.100",
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
      </Stack>

      {/* Action Buttons */}
      <Stack direction="row" justifyContent="space-between">
        <Button variant="contained">Continue Shopping</Button>
        <Button variant="contained">Confirm Order</Button>
      </Stack>
    </Box>
  );
};
