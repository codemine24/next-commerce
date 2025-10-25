"use client";

import Box from "@mui/material/Box";

import { RadioButtonField } from "@/components/form/radio-button-field";
import { DELIVERY_METHODS } from "@/constants/checkout";

import { SectionTitle } from "./section-title";

export const DeliveryMethod = () => {
    return (
        <Box width="100%" p={2} border={1} borderColor="divider" display="flex" flexDirection="column" gap={2}>
            <SectionTitle title="Delivery Method" step={2} />
            <RadioButtonField name="delivery_method" options={Object.values(DELIVERY_METHODS).map((method) => ({ label: method.label, value: method.value }))} />
        </Box>
    )
};