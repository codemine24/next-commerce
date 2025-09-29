"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";

import { Order, orderSchema } from "@/zod/order-schema";

import { CheckoutForm } from "./checkout-form";

export const CheckoutFormContainer = () => {
    const methods = useForm<Order>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            address: {
                name: "",
                contact_number: "",
                email: "",
                address: "",
                postal_code: "",
                city: "",
                district: "",
                country: "",
                is_default: undefined,
            },
            payment_type: undefined,
            delivery_method: undefined,
            coupon_code: undefined,
            comment: undefined,
        },
    });

    return (
        <Box>
            <CheckoutForm methods={methods} onSubmit={(data) => { }} />
        </Box>
    );
};