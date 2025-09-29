"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
import React from "react";

import { StatusChip, WishlistProduct } from "@/components/status-chip";
import { DeleteCircle } from "@/icons/delete-circle";
import { ShoppingCart } from "@/icons/shopping-cart";
import { BORDER_RADIUS } from "@/theme";
import { currencyFormatter } from "@/utils/currency-formatter";

interface WishlistTableProps {
  products: WishlistProduct[];
}

export const WishlistTable = ({ products }: WishlistTableProps) => {
  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Product
            </TableCell>
            <TableCell>
              Price
            </TableCell>
            <TableCell>
              Stock Status
            </TableCell>
            <TableCell align="center">
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                    }}
                  />
                  <Typography>{product.name}</Typography>
                </Box>
              </TableCell>

              <TableCell>
                <Typography>{currencyFormatter(product.price)}</Typography>
              </TableCell>

              <TableCell>
                <StatusChip status={product.status} />
              </TableCell>

              <TableCell align="center">
                <Stack direction="row" justifyContent="center" spacing={2}>
                  <Button
                    size="medium"
                    startIcon={<ShoppingCart />}
                    sx={{
                      py: 1.5,
                      borderRadius: BORDER_RADIUS.default,
                      bgcolor: "#F7FCFB",
                      color: "text.primary",
                      "&:hover": { bgcolor: "#E6F2EE" },
                    }}
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    sx={{
                      bgcolor: "#F7FCFB",
                      borderRadius: BORDER_RADIUS.default,
                      border: "1px solid #E6F2EE",
                      "&:hover": {
                        color: "#FF3030",
                        bgcolor: alpha("#FF3030", 0.1),
                      },
                    }}
                  >
                    <DeleteCircle />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
