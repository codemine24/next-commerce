"use client";

import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  alpha,
  tableCellClasses,
} from "@mui/material";
import Image from "next/image";

import { ProductQuantityButton } from "@/components/product-quantity-button";
import { useCart } from "@/hooks/use-cart";
import { CrossIcon } from "@/icons/cross-icon";
import { currencyFormatter } from "@/utils/currency-formatter";

export const CartItems = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <TableContainer sx={{ my: 4 }}>
      <Table
        sx={{
          minWidth: 650,
          borderCollapse: "collapse",
          [`& .${tableCellClasses.root}`]: {
            borderTop: "1px solid",
            borderBottom: "1px solid",
            borderColor: "divider",
            "&:not(:first-of-type):not(:last-of-type)": {
              borderLeft: "none",
              borderRight: "none",
            },
          },
          [`& .${tableCellClasses.root}:first-of-type`]: {
            borderLeft: "1px solid",
            borderColor: "divider",
          },
          [`& .${tableCellClasses.root}:last-of-type`]: {
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        {/* Header */}
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Product</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">Action</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">Quantity</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">Unit Price</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">Total</Typography>
            </TableCell>
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
                    src={
                      item.product.thumbnail ||
                      "https://placehold.co/600x400/png"
                    }
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
                  <CrossIcon />
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
              <TableCell>
                <Typography>
                  {" "}
                  {currencyFormatter(item.product.price)}
                </Typography>
              </TableCell>

              {/* Total */}
              <TableCell>
                <Typography>{currencyFormatter(item.total)}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
