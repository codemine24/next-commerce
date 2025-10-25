"use client";

import Box from "@mui/material/Box";

import { RadioButtonField } from "@/components/form/radio-button-field";
import { PAYMENT_TYPES } from "@/constants/checkout";

import { SectionTitle } from "./section-title";

export const PaymentType = () => {
    return (
        <Box width="100%" p={2} border={1} borderColor="divider" display="flex" flexDirection="column" gap={2}>
            <SectionTitle title="Payment Type" step={3} />
            <RadioButtonField
                name="payment_type"
                options={Object.values(PAYMENT_TYPES).map((method) => ({ label: method.label, value: method.value }))} />
        </Box>
    )
}