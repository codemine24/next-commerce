import {
  Box,
  Button,
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
import React from "react";

import { StatusChip, WishlistProduct } from "@/components/status-chip";
import { DeleteCircle } from "@/icons/delete-circle";
import { ShoppingCart } from "@/icons/shopping-cart";
import { BORDER_RADIUS } from "@/theme";
import { currencyFormatter } from "@/utils/currency-formatter";

interface WishlistTableProps {
  products: WishlistProduct[];
}

export const WishlistTable: React.FC<WishlistTableProps> = ({ products }) => {
  return (
    <TableContainer sx={{ mt: 2 }}>
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
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Product</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">Price</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">Stock Status</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">Action</Typography>
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

              <TableCell>
                <Stack direction="row" spacing={2}>
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
