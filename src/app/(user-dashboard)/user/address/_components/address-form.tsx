import { Button, Grid, Box } from "@mui/material";
import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Checkbox, TextField } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { PhoneInputField } from "@/components/form/phone-input-field";
import { AddressSchema } from "@/zod/address-schema";

import { AddressHeader } from "./address-header";

interface AddressFormProps {
  methods: UseFormReturn<AddressSchema>;
  onSubmit: (data: AddressSchema) => void;
  onCancel: () => void;
}

export const AddressForm = ({
  methods,
  onSubmit,
  onCancel,
}: AddressFormProps) => {
  return (
    <>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Box>
          <AddressHeader title="Add New Address" />
          <Grid container spacing={2}>
            {/* Name */}
            <Grid size={{ xs: 12 }}>
              <TextField
                name="name"
                label="Name"
                required
                sx={{ maxWidth: { xs: "100%", sm: "320px" } }}
              />
            </Grid>

            {/* Contact Number */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <PhoneInputField
                name="contact_number"
                label="Contact Number"
                required
                sx={{ maxWidth: { xs: "100%", sm: "320px" } }}
              />
            </Grid>

            {/* Secondary Contact Number */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <PhoneInputField
                name="secondary_contact_number"
                label="Secondary Contact Number"
                sx={{ maxWidth: { xs: "100%", sm: "320px" } }}
              />
            </Grid>

            {/* Email */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <TextField
                name="email"
                label="Email"
                required
                sx={{ maxWidth: { xs: "100%", sm: "320px" } }}
              />
            </Grid>

            {/* Address */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <TextField
                name="address"
                label="Address"
                // rows={2}
                sx={{ maxWidth: { xs: "100%", sm: "320px" } }}
              />
            </Grid>

            {/* Postal Code */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <TextField
                name="postal_code"
                label="Postal Code"
                sx={{ maxWidth: { xs: "100%", sm: "320px" } }}
              />
            </Grid>

            {/* City */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <TextField
                name="city"
                label="City"
                required
                sx={{ maxWidth: { xs: "100%", sm: "320px" } }}
              />
            </Grid>

            {/* District */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <TextField
                name="district"
                label="District"
                required
                sx={{ maxWidth: { xs: "100%", sm: "320px" } }}
              />
            </Grid>

            {/* Country */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <TextField
                name="country"
                label="Country"
                required
                sx={{ maxWidth: { xs: "100%", sm: "320px" } }}
              />
            </Grid>

            {/* Is Default Checkbox */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <Checkbox name="is_default" label="Set as default address" />
            </Grid>

            {/* Submit Button */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <Box sx={{ display: "flex", gap: 2, mt: 1, mb: 2 }}>
                <Button type="submit" variant="contained">
                  Save Address
                </Button>
                <Button type="button" variant="outlined" onClick={onCancel}>
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </>
  );
};
