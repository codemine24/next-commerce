"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React from "react";

import { useCart } from "@/hooks/use-cart";

export const OrderOverview = () => {
    const { cart } = useCart()

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.cart_items?.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Typography variant="h6">{item.product.name}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">${item.product.price}</Typography>
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
