"use client";

import { BoxContainer } from "@/components/box-container";
import { CloseIcon } from "@/icons/close";
import { ShippingArrowIcon } from "@/icons/spinning-arrow";
import { BORDER_RADIUS } from "@/theme";
import {
  Box,
  Button,
  IconButton,
  inputBaseClasses,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  tableRowClasses,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import EmptyCart from "./components/empty-cart";
import CartTable from "./components/cart-table";
import { CartItem } from "./components/types";
import { cartData } from "./components/cart-data";

const CartPage = () => {
  const subtotal = 10;
  const delivery = 60;
  const total = subtotal + delivery;

  return (
    <BoxContainer>
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          Your Cart
        </Typography>

        <CartTable />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Box sx={{ minWidth: 300 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ borderBottom: "1px solid #edeaea", py: 2 }}
            >
              <Typography width="65%" fontSize={16} fontWeight={400}>
                Subtotal:
              </Typography>
              <Typography fontSize={16} fontWeight={400}>
                $ {subtotal}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                borderBottom: "1px solid #edeaea",
                py: 2,
              }}
            >
              <Typography width="65%" fontSize={16} fontWeight={400}>
                Home Delivery:
              </Typography>
              <Typography fontSize={16} fontWeight={400}>
                $ {delivery}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ borderBottom: "1px solid #edeaea", py: 2 }}
            >
              <Typography width="65%" fontSize={16} fontWeight={400}>
                Total:
              </Typography>
              <Typography fontSize={16} fontWeight={400}>
                $ {total}
              </Typography>
            </Stack>
          </Box>
        </Box>

        {/* Discount */}
        <Box my={3}>
          <Typography variant="h3" fontWeight={400}>
            What would you like to do next?
          </Typography>
          <Typography variant="body2" color="#8A9994" my={2}>
            Choose if you have a discount code or reward points you want to use
            or would like to estimate your delivery cost.
          </Typography>
        </Box>

        {/* Promo  */}
        <Stack
          direction="row"
          spacing={2}
          mb={4}
          sx={{
            bgcolor: "#F2FFFB",
            p: 3,
            borderRadius: BORDER_RADIUS.default,
          }}
        >
          <Stack direction="row" spacing={2} flex="1">
            <TextField
              fullWidth
              placeholder="Promo / Coupon code"
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
                color: "background.default",
                border: "1px solid blue",
                borderRadius: BORDER_RADIUS.default,
                bgcolor: "common.black",
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
                color: "background.default",
                border: "1px solid blue",
                borderRadius: BORDER_RADIUS.default,
                bgcolor: "common.black",
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
      {/* -------Empty cart------- */}
      <EmptyCart />
    </BoxContainer>
  );
};

export default CartPage;
