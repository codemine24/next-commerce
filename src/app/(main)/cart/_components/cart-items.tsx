"use client";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import { useCart } from "@/hooks/use-cart";
import { CloseIcon } from "@/icons/close";
import { ShippingArrowIcon } from "@/icons/spinning-arrow";
import { BORDER_RADIUS } from "@/theme";

export const CartItems = () => {
  const { cart } = useCart();

  return (
    <TableContainer sx={{ my: 4 }}>
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
              borderBottom: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          {cart?.cart_items?.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{ px: 0, py: 1 }}>
                <Image
                  src={
                    item.product.thumbnail || "https://placehold.co/600x400/png"
                  }
                  alt={item.product.name}
                  width={60}
                  height={60}
                />
              </TableCell>
              <TableCell sx={{ px: 1, py: 1 }}>
                <Typography variant="h6">{item.product.name}</Typography>
              </TableCell>
              <TableCell sx={{ px: 1, py: 1 }}>
                <Typography variant="h6">F3KS-V4</Typography>
                {/* <Typography variant="h6">{item.model}</Typography> */}
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
                <Typography variant="h6">TK {item.product.price}</Typography>
              </TableCell>
              <TableCell sx={{ px: 1, py: 1 }}>
                <Typography variant="h6">
                  TK {item.product.price * item.quantity}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
