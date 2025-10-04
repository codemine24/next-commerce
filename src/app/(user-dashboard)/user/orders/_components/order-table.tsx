"use client";
import { Button, Stack, TableContainer, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { MyOrderActionPopover } from "./my-order-action-popover";
import dayjs from "dayjs";
import { StatusRenderer } from "@/components/status-renderer";

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
            <TableCell>Order</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Delivery method</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Action</TableCell>
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

              {/* Date */}
              <TableCell>
                {dayjs(item.created_at).format("ddd MMM D YYYY")}
              </TableCell>

              {/* Status */}
              <TableCell>
                <StatusRenderer status={item.order_status} />
              </TableCell>

              {/* Payment method */}
              <TableCell align="right">{item.delivery_method}</TableCell>

              {/* Total */}
              <TableCell align="right">{item.payable_amount || 0}</TableCell>

              {/* Action */}
              <TableCell align="right">
                <MyOrderActionPopover
                  item={{
                    id: item.id,
                    name: item.order_id,
                    slug: item.order_status,
                    code: item.payment_status,
                    icon: item.payment_status,
                    description: item.payment_status,
                    featured: true,
                    created_at: item.created_at,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
