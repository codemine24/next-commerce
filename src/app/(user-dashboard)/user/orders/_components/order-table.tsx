"use client";
import { Stack, TableContainer, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";

import { StatusRenderer } from "@/components/status-renderer";
import { ClipboardIcon } from "@/icons/clipboard-icon";
import { currencyFormatter } from "@/utils/currency-formatter";

import { TickIcon } from "@/icons/tick-icon";
import { useState } from "react";
import { MyOrderActionPopover } from "./my-order-action-popover";

interface Order {
  id: string;
  order_id: string;
  order_status: string;
  payment_status: string;
  total_amount: number;
  created_at: string;
  delivery_method: string;
}

export const OrderTable = ({ orders }: { orders: Order[] }) => {
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  const handleCopyOrderId = (orderId: string) => {
    navigator.clipboard.writeText(orderId);
    setCopiedOrderId(orderId);

    setTimeout(() => {
      setCopiedOrderId(null);
    }, 1000);
  };
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
            <TableCell>Order Status</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        {/* Body */}
        <TableBody>
          {orders?.map((item) => (
            <TableRow key={item.id}>
              {/* Product */}
              <TableCell>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  title="Copy Order ID"
                >
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.order_id}
                  </Typography>
                  {copiedOrderId ? (
                    <TickIcon sx={{ height: 12, width: 12 }} />
                  ) : (
                    <ClipboardIcon
                      sx={{
                        height: 12,
                        width: 12,
                        cursor: "pointer",
                        color: "text.secondary",
                        "&:hover": { color: "text.primary" },
                      }}
                      onClick={() => handleCopyOrderId(item.order_id)}
                    />
                  )}
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
              <TableCell>
                <StatusRenderer status={item.payment_status} />
              </TableCell>

              {/* Total */}
              <TableCell>{currencyFormatter(item.total_amount) || 0}</TableCell>

              {/* Action */}
              <TableCell>
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
