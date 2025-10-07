"use client";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import { ProductQuantityButton } from "@/components/product-quantity-button";
import { useCart } from "@/hooks/use-cart";
import { CloseIcon } from "@/icons/close";
import { currencyFormatter } from "@/utils/currency-formatter";
import { makeImageUrl } from "@/utils/helper";

export const CartItems = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <TableContainer sx={{ my: 4 }}>
      <Table
        sx={{
          minWidth: 650,
        }}
      >
        {/* Header */}
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>

        {/* Body */}
        <TableBody>
          {cart.cart_items.map((item) => (
            <TableRow key={item.id}>
              {/* Product */}
              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Image
                    src={makeImageUrl(item.product.thumbnail)}
                    alt={item.product.name}
                    width={60}
                    height={60}
                  />
                  <Typography variant="body1">{item.product.name}</Typography>
                </Stack>
              </TableCell>

              {/* Action */}
              <TableCell>
                <IconButton
                  onClick={() => removeFromCart(item.id)}
                  sx={{
                    border: "1px solid",
                    borderColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.3),
                    color: "grey.400",
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                    "&:hover": {
                      bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                      borderColor: (theme) =>
                        alpha(theme.palette.error.main, 0.3),
                    },
                    "&:hover svg": {
                      color: "error.light",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </TableCell>

              {/* Quantity */}
              <TableCell>
                <ProductQuantityButton
                  qty={item.quantity}
                  onAdd={() => increaseQty(item.id)}
                  onRemove={() => decreaseQty(item.id)}
                />
              </TableCell>

              {/* Unit Price */}
              <TableCell align="right">
                <Typography>{currencyFormatter(item.product.price)}</Typography>
              </TableCell>

              {/* Total */}
              <TableCell align="right">
                <Typography>{currencyFormatter(item.total)}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
