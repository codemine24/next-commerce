"use client";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import { ProductQuantityButton } from "@/components/product-quantity-button";
import { DataTable } from "@/components/table/data-table";
import { Column } from "@/components/table/data-table";
import { useCart } from "@/hooks/use-cart";
import { CloseIcon } from "@/icons/close";
import { CartItem } from "@/interfaces/cart";
import { currencyFormatter } from "@/utils/currency-formatter";
import { makeImageUrl } from "@/utils/helper";

export const CartItemsTable = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const columns: Column<CartItem>[] = [
    {
      label: "Product",
      render: (row) => (
        <Stack direction="row" spacing={2} alignItems="center">
          <Image
            src={makeImageUrl(row.product.thumbnail)}
            alt={row.product.name}
            width={60}
            height={60}
          />
          <Typography variant="body1">{row.product.name}</Typography>
        </Stack>
      ),
    },
    {
      label: "Quantity",
      render(row) {
        return (
          <ProductQuantityButton
            qty={row.quantity}
            onAdd={() => increaseQty(row.id)}
            onRemove={() => decreaseQty(row.id)}
          />
        )
      },
    },
    {
      label: "Action",
      render(row) {
        return (
          <IconButton
            onClick={() => removeFromCart(row.id)}
            color="error"
          >
            <CloseIcon />
          </IconButton>
        )
      },
    },
    {
      label: "Unit Price",
      render(row) {
        return (
          <Typography>{currencyFormatter(row.product.price)}</Typography>
        )
      },
    },
    {
      label: "Total",
      render(row) {
        return (
          <Typography>{currencyFormatter(row.total)}</Typography>
        )
      },
    },
  ]

  return (
    <DataTable
      rows={cart.cart_items}
      columns={columns}
      rowKey="id"
      emptyState="No items in cart"
    />
  );
};
