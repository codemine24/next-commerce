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

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      image: "https://placehold.co/80x80/png",
      name: "Living Room Furniture Chair",
      model: "ZV-1v0",
      quantity: 2,
      price: 100,
    },
    {
      id: 2,
      image: "https://placehold.co/80x80/png",
      name: "Living Room Furniture Chair ",
      model: "ZV-1v0",
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
        <Typography variant="h3" gutterBottom>
          Shopping Cart
        </Typography>

        {/* Table */}
        <TableContainer sx={{ mb: 4 }}>
          <Table>
            <TableHead
              sx={{
                borderRadius: BORDER_RADIUS.default,
                [`& .${tableRowClasses.root}`]: {
                  // bgcolor: "red",
                },
              }}
            >
              <TableRow
                sx={{
                  borderRadius: "10px",
                  [`& .${tableCellClasses.root}`]: {
                    py: 1,
                    pl: 1,
                  },
                }}
              >
                <TableCell>Image</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& .MuiTableCell-root": {
                  borderBottom: "1px solid #edeaea",
                },
              }}
            >
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ px: 0, py: 1 }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                    />
                  </TableCell>
                  <TableCell sx={{ px: 1, py: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                  </TableCell>
                  <TableCell sx={{ px: 1, py: 1 }}>
                    <Typography variant="h6">{item.model}</Typography>
                  </TableCell>

                  {/* Quantity */}
                  <TableCell sx={{ px: 1, py: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TextField
                        value={item.quantity}
                        size="small"
                        type="number"
                        sx={{ width: 80, fontSize: "14px", fontWeight: 700 }}
                      />
                      <IconButton size="small">
                        <ShippingArrowIcon
                          fontSize="small"
                          sx={{ color: "text.secondary" }}
                        />
                      </IconButton>
                      <IconButton size="small" sx={{ fontSize: "16px" }}>
                        <CloseIcon
                          fontSize="small"
                          sx={{ color: "text.secondary" }}
                        />
                      </IconButton>
                    </Stack>
                  </TableCell>

                  <TableCell sx={{ px: 1, py: 1 }}>
                    <Typography variant="h6">TK {item.price}</Typography>
                  </TableCell>
                  <TableCell sx={{ px: 1, py: 1 }}>
                    <Typography variant="h6">
                      TK {item.price * item.quantity}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Total */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Box sx={{ minWidth: 280 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ borderBottom: "1px solid #edeaea", mb: 1, pb: 1 }}
            >
              <Typography fontWeight={600} width="60%" textAlign="right">
                Subtotal:
              </Typography>
              <Typography fontWeight={600} color="red">
                TK {subtotal}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ borderBottom: "1px solid #edeaea", mb: 1, pb: 1 }}
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
              sx={{ borderBottom: "1px solid #edeaea", pb: 1 }}
            >
              <Typography fontWeight={600} width="60%" textAlign="right">
                Total:
              </Typography>
              <Typography fontWeight={700} color="red">
                TK {total}
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
    </BoxContainer>
  );
};

export default Cart;
