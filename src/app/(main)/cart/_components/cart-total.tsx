"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";

import { DELIVERY_METHODS } from "@/constants/checkout";
import { useCart } from "@/hooks/use-cart";
import { currencyFormatter } from "@/utils/currency-formatter";

export const CartTotal = () => {
    const { cart } = useCart();
    const { watch } = useFormContext()
    const deliveryMethod = watch("delivery_method");
    const delivery = deliveryMethod === DELIVERY_METHODS.HOME_DELIVERY.value ? 60 : 0;

    return (
        <Box display="flex" justifyContent="flex-end" my={4}>
            <Box minWidth={280}>
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
                        {deliveryMethod === DELIVERY_METHODS.HOME_DELIVERY.value ? "Home Delivery" : "Store Pickup"}:
                    </Typography>
                    <Typography color="primary.main">
                        {currencyFormatter(delivery)}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
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