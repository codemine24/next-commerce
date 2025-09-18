import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  tableRowClasses,
  alpha,
} from "@mui/material";
import Image from "next/image";
import React from "react";

import { DeleteCircle } from "@/icons/delete-circle";

import { cartData } from "./cart-data";
import Counter from "./counter";

const BORDER_RADIUS = {
  default: "10px",
};

const CartTable = () => {
  return (
    <TableContainer
      sx={{
        mt: 2,
        border: "1px solid #EFEDFA",
        borderRadius: BORDER_RADIUS.default,
      }}
    >
      <Table
        sx={{
          "& .MuiTableCell-root": {
            fontSize: 16,
            fontWeight: 400,
          },
        }}
      >
        {/* Table Header */}
        <TableHead
          sx={{
            borderRadius: BORDER_RADIUS.default,
            [`& .${tableRowClasses.root}`]: {},
          }}
        >
          <TableRow
            sx={{
              "& .MuiTableCell-root": {
                borderBottom: "1px solid #EFEDFA",
                fontSize: 16,
                fontWeight: "400",
              },
            }}
          >
            <TableCell>Product</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody
          sx={{
            "& .MuiTableCell-root": {
              borderBottom: "1px solid #edeaea",
            },
          }}
        >
          {cartData.map((item) => (
            <TableRow
              key={item.id}
              sx={{
                "& .MuiTableCell-root": {
                  borderBottom: "1px solid #EFEDFA",
                  fontSize: 16,
                  fontWeight: "400",
                },
              }}
            >
              {/* Image */}
              <TableCell sx={{ py: 1 }}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                />
              </TableCell>

              {/* Model */}
              <TableCell>{item.name}</TableCell>

              {/* Quantity  */}
              <TableCell>
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
              </TableCell>

              {/* Price */}
              <TableCell>
                <Counter />
              </TableCell>

              <TableCell>${item.price}</TableCell>

              {/* Total */}
              <TableCell>${item.price * item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
