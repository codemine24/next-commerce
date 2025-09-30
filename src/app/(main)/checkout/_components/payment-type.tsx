"use client";

import Box from "@mui/material/Box";

import { RadioButtonField } from "@/components/form/radio-button-field";

import { SectionTitle } from "./section-title";

const PAYMENT_TYPES = [
    { label: "Cash on Delivery", value: "CASH_ON_DELIVERY" },
    { label: "Online Payment", value: "ONLINE_PAYMENT" },
];

export const PaymentType = () => {
    return (
        <Box width="100%" p={2} border={1} borderColor="divider" display="flex" flexDirection="column" gap={2}>
            <SectionTitle title="Payment Type" step={3} />
            <RadioButtonField name="payment_type" options={PAYMENT_TYPES} />
        </Box>
    )
}