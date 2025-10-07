"use client";
import { Button, Grid, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Checkbox, TextField } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { PhoneInputField } from "@/components/form/phone-input-field";
import { SubmitButton } from "@/components/submit-button";
import { AddressSchema } from "@/zod/address-schema";



interface AddressFormProps {
  methods: UseFormReturn<AddressSchema>;
  onSubmit: (data: AddressSchema) => void;
}

export const AddressForm = ({ methods, onSubmit }: AddressFormProps) => {
  const router = useRouter();
  const isSubmitting = methods.formState.isSubmitting;

  return (
    <>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Box>
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
                required
                sx={{ maxWidth: { xs: "100%", sm: "320px" } }}
              />
            </Grid>

            {/* Postal Code */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <TextField
                name="postal_code"
                label="Postal Code"
                required
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
              <Checkbox name="is_default" label="Set as default address"  />
            </Grid>

            {/* Submit Button */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <Box sx={{ display: "flex", gap: 2, mt: 1, mb: 2 }}>
                <SubmitButton
                  label="Save Address"
                  isLoading={isSubmitting}
                  sx={{
                    width: 200,
                    height: 50,
                    textTransform: "none",
                  }}
                />
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => router.push("/user/address")}
                >
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
