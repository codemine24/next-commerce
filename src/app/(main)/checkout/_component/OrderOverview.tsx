"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";

const BORDER_RADIUS = { default: "8px" }; // adjust if you already have theme

type OrderItem = {
  id: string | number;
  name: string;
  price: number;
  total: number;
};

interface OrderOverviewProps {
  orderItems: OrderItem[];
}

const OrderOverview: React.FC<OrderOverviewProps> = ({ orderItems }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead
          sx={{
            borderRadius: BORDER_RADIUS.default,
            "& .MuiTableCell-root": {
              borderRight: "1px solid #fff",
            },
          }}
        >
          <TableRow
            sx={{
              bgcolor: "background.paper",
              align: "left",
              [`& .${tableCellClasses.root}`]: {
                py: 1,
              },
            }}
          >
            <TableCell>Product name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Typography variant="h6">{item.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">${item.price}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">${item.total}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderOverview;
