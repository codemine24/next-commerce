"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useCart } from "@/hooks/use-cart";
import { currencyFormatter } from "@/utils/currency-formatter";

export const CartTotal = () => {
    const { cart } = useCart();
    const delivery = 60;

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
            <Box sx={{ minWidth: 280 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                        mb: 1,
                        pb: 1,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Typography width="60%" textAlign="right">
                        Subtotal:
                    </Typography>
                    <Typography color="primary.main">
                        {currencyFormatter(cart?.cart_total)}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                        mb: 1,
                        pb: 1,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Typography width="60%" textAlign="right">
                        Home Delivery:
                    </Typography>
                    <Typography color="primary.main">
                        {currencyFormatter(delivery)}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ borderBottom: "1px solid", borderColor: "divider", pb: 1 }}
                >
                    <Typography fontWeight={600} width="60%" textAlign="right">
                        Total:
                    </Typography>
                    <Typography fontWeight={700} color="primary.main">
                        {currencyFormatter(cart?.cart_total + delivery)}
                    </Typography>
                </Stack>
            </Box>
        </Box>
    )
}