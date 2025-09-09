"use client";

import { BoxContainer } from "@/components/box-container";
import { BORDER_RADIUS } from "@/theme";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Stack,
  Divider,
} from "@mui/material";

const CartPage = () => {
  // Example cart items (replace with ProductCart context later)
  const cartItems = [
    {
      id: 1,
      image: "https://placehold.co/80x80/png",
      name: "Product A",
      model: "Model A",
      quantity: 2,
      price: 100,
    },
    {
      id: 2,
      image: "https://placehold.co/80x80/png",
      name: "Product B",
      model: "Model B",
      quantity: 1,
      price: 150,
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 60;
  const total = subtotal + delivery;

  return (
    <BoxContainer>
      <Box sx={{ p: 4 }}>
        {/* Title */}
        <Typography variant="h3" gutterBottom>
          Shopping Cart
        </Typography>

        {/* Table */}
        <TableContainer sx={{ mb: 4 }}>
          <Table>
            <TableHead sx={{ borderBottom: "1px solid red" }}>
              <TableRow
                sx={{
                  bgcolor: "background.paper",
                }}
              >
                <TableCell sx={{}}>Image</TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={item.id}
                >
                  <TableCell>
                    <img
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>${item.price * item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Totals */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Box sx={{ minWidth: 250 }}>
            <Stack direction="row" justifyContent="space-between" mb={1}>
              <Typography>Subtotal:</Typography>
              <Typography fontWeight={600}>${subtotal}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" mb={1}>
              <Typography>Home Delivery:</Typography>
              <Typography fontWeight={600}>${delivery}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Total:</Typography>
              <Typography fontWeight={700} color="primary">
                ${total}
              </Typography>
            </Stack>
          </Box>
        </Box>

        {/* Title + Subtitle */}
        <Box mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Discount & Vouchers
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Apply promo codes or gift vouchers to get discounts.
          </Typography>
        </Box>

        {/* Promo Code */}
        <Stack
          direction="row"
          spacing={2}
          mb={4}
          sx={{
            bgcolor: "background.paper",
            p: 4,
            borderRadius: BORDER_RADIUS.default,
          }}
        >
          <Stack direction="row" spacing={2} flex="1">
            <TextField fullWidth placeholder="Promo code" size="small" />
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
              placeholder="Enter your gift voucher"
              size="small"
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
              color: "#ffffff",
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
              color: "#ffffff",
              border: "1px solid blue",
              borderRadius: BORDER_RADIUS.default,
            }}
          >
            Confirm Order
          </Button>
        </Stack>
      </Box>
    </BoxContainer>
  );
};

export default CartPage;
