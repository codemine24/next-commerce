"use client";
import { Stack, TableContainer, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import { useState } from "react";

import { StatusRenderer } from "@/components/status-renderer";
import { ClipboardIcon } from "@/icons/clipboard-icon";
import { TickIcon } from "@/icons/tick-icon";
import { IOrder } from "@/interfaces/order";
import { currencyFormatter } from "@/utils/currency-formatter";

import { MyOrderActionPopover } from "./my-order-action-popover";

export const OrderTable = ({ orders }: { orders: IOrder[] }) => {
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  const handleCopyOrderId = (orderId: string) => {
    navigator.clipboard.writeText(orderId);
    setCopiedOrderId(orderId);

    setTimeout(() => {
      setCopiedOrderId(null);
    }, 1000);
  };
  return (
    <TableContainer>
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
                <MyOrderActionPopover item={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
