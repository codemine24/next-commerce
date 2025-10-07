"use client";

import Box from "@mui/material/Box";

import { RadioButtonField } from "@/components/form/radio-button-field";

import { SectionTitle } from "./section-title";

const DELIVERY_METHODS = [
    { label: "Home Delivery", value: "HOME_DELIVERY" },
    { label: "Store Pickup", value: "STORE_PICKUP" },
]

export const DeliveryMethod = () => {
    return (
        <Box width="100%" p={2} border={1} borderColor="divider" display="flex" flexDirection="column" gap={2}>
            <SectionTitle title="Delivery Method" step={2} />
            <RadioButtonField name="delivery_method" options={DELIVERY_METHODS} />
        </Box>
    )
};