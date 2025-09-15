"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { inputBaseClasses } from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useCart } from "@/providers/cart-provider";
import { BORDER_RADIUS } from "@/theme";

import { CartItems } from "./cart-items";

export const CartPageContainer = () => {
  const { cart } = useCart();
  const delivery = 60;

  return (
    <Box mt={2}>
      <Typography variant="h3">Shopping Cart</Typography>

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
            <Typography fontWeight={600} width="60%" textAlign="right">
              Subtotal:
            </Typography>
            <Typography fontWeight={600} color="red">
              TK {cart.cart_total}
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
            <Typography fontWeight={600} width="60%" textAlign="right">
              Home Delivery:
            </Typography>
            <Typography fontWeight={600} color="red">
              TK {delivery}
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
            <Typography fontWeight={700} color="red">
              TK {cart.cart_total + delivery}
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* Discount */}
      <Box my={3}>
        <Typography variant="h5" fontWeight={600}>
          What would you like to do next?
        </Typography>
        <Typography variant="h6" color="text.primary" mt={1}>
          Choose if you have a discount code or reward points you want to use or
          would like to estimate your delivery cost.
        </Typography>
      </Box>

      {/* Promo  */}
      <Stack
        direction="row"
        spacing={2}
        mb={4}
        sx={{
          bgcolor: "background.paper",
          p: 3,
          borderRadius: BORDER_RADIUS.default,
        }}
      >
        <Stack direction="row" spacing={2} flex="1">
          <TextField
            fullWidth
            placeholder="Promo / Coupon code"
            size="small"
            sx={{
              [`& .${inputBaseClasses.root}`]: {
                borderRadius: BORDER_RADIUS.default,
              },
              [`& .${inputBaseClasses.input}`]: {
                p: "5px 14px",
              },
            }}
          />
          <Button
            variant="outlined"
            sx={{
              whiteSpace: "nowrap",
              color: "blue",
              border: "1px solid blue",
              borderRadius: BORDER_RADIUS.default,
            }}
          >
            Apply Coupon
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} flex="1">
          <TextField
            fullWidth
            placeholder="Enter your gift voucher code here"
            size="small"
            sx={{
              [`& .${inputBaseClasses.root}`]: {
                borderRadius: BORDER_RADIUS.default,
              },
              [`& .${inputBaseClasses.input}`]: {
                p: "5px 14px",
              },
            }}
          />
          <Button
            variant="outlined"
            sx={{
              whiteSpace: "nowrap",
              color: "blue",
              border: "1px solid blue",
              borderRadius: BORDER_RADIUS.default,
              px: "16px",
            }}
          >
            Apply Voucher
          </Button>
        </Stack>
      </Stack>

      {/* Action Buttons */}
      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="outlined"
          sx={{
            whiteSpace: "nowrap",
            bgcolor: "blue",
            color: "#fff",
            border: "1px solid blue",
            borderRadius: BORDER_RADIUS.default,
          }}
        >
          Continue Shopping
        </Button>
        <Button
          variant="contained"
          sx={{
            whiteSpace: "nowrap",
            bgcolor: "blue",
            color: "#fff",
            border: "1px solid blue",
            borderRadius: BORDER_RADIUS.default,
          }}
        >
          Confirm Order
        </Button>
      </Stack>
    </Box>
  );
};
