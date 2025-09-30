"use client";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React from "react";

import { useCart } from "@/hooks/use-cart";
import { currencyFormatter } from "@/utils/currency-formatter";

import { CartTotal } from "../../cart/_components/cart-total";

import { SectionTitle } from "./section-title";

export const OrderOverview = () => {
    const { cart } = useCart()

    return (
        <Box p={2} border={1} borderColor="divider">
            <SectionTitle title="Order Overview" step={2} />
            <TableContainer sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.cart_items?.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Typography variant="h6">{item.product.name}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">{currencyFormatter(item.product.price)}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">{currencyFormatter(item.total)}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <CartTotal />
        </Box>
    );
};
