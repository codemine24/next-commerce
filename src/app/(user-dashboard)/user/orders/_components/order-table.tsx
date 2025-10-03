"use client";
import {
  alpha,
  IconButton,
  Stack,
  TableContainer,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { CloseIcon } from "@/icons/close";

interface Order {
  id: string;
  order_id: string;
  order_status: string;
  payment_status: string;
  payable_amount: number;
  created_at: string;
  delivery_method: string;
}

export const OrderTable = ({ orders }: { orders: Order[] }) => {
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
          {orders?.map((item) => (
            <TableRow key={item.id}>
              {/* Product */}
              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body1">{item.order_id}</Typography>
                </Stack>
              </TableCell>

              {/* Action */}
              <TableCell>
                <IconButton
                  onClick={() => {}}
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
              <TableCell>-</TableCell>

              {/* Unit Price */}
              <TableCell align="right">-</TableCell>

              {/* Total */}
              <TableCell align="right">-</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
