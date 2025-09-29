"use client";

import Box from "@mui/material/Box";

import { TextField } from "@/components/form";

import { SectionTitle } from "./section-title";

export const CustomerInfo = () => {
    return (
        <Box
            p={2}
            border={1}
            borderColor="divider"
            display="flex"
            flexDirection="column"
            gap={2}
        >
            <SectionTitle title="Customer Information" step={1} />
            <TextField type="text" name="address.name" label="Name" required />
            <TextField type="text" name="address.contact_number" label="Contact Number" required />
            <TextField type="text" name="address.secondary_contact_number" label="Secondary Contact Number" />
            <TextField type="email" name="address.email" label="Email" required />
            <TextField type="text" name="address.address" label="Address" required />
            <TextField type="number" name="address.postal_code" label="Postal Code" />
            <TextField type="text" name="address.city" label="City" required />
            <TextField type="text" name="address.district" label="District" required />
            <TextField type="text" name="address.country" label="Country" required />
        </Box>
    );
};