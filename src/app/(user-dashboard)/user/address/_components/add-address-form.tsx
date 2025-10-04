import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  FormControl,
} from "@mui/material";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { addAddresses } from "@/actions/address";
import { addressSchema, AddressSchema } from "@/zod/address-schema";

import { AddressHeader } from "./address-header";

interface AddAddressFormProps {
  onSubmit: (data: AddressSchema) => void;
  onCancel: () => void;
  defaultValues?: AddressSchema;
}

const AddAddressForm: React.FC<AddAddressFormProps> = ({
  onCancel,
  defaultValues,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues || {
      name: "",
      contact_number: "",
      secondary_contact_number: "",
      email: "",
      address: "",
      postal_code: "",
      city: "",
      district: "",
      country: "",
      is_default: false,
    },
  });

  const handleFormSubmit: SubmitHandler<AddressSchema> = async (data) => {
    console.log("Form Data:", data);

    const response = await addAddresses(data);
    console.log("Response from addAddresses:", response);

    reset();
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };
  return (
    <>
      <Box sx={{ p: { xs: 0, md: 3 } }}>
        <AddressHeader title="Add New Address" />
        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          <Box
            sx={{
              borderColor: "divider",
              overflowY: "auto",
            }}
          ></Box>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid size={{ xs: 12 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    placeholder="Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            {/* Contact Number */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name="contact_number"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    placeholder="Contact Number"
                    fullWidth
                    error={!!errors.contact_number}
                    helperText={errors.contact_number?.message}
                  />
                )}
              />
            </Grid>

            {/* Secondary Contact Number */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name="secondary_contact_number"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    placeholder="Secondary Contact Number"
                    fullWidth
                    error={!!errors.secondary_contact_number}
                    helperText={errors.secondary_contact_number?.message}
                  />
                )}
              />
            </Grid>

            {/* Email */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    placeholder="Email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>

            {/* Address */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    placeholder="Address"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>

            {/* Postal Code */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name="postal_code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    placeholder="Postal Code"
                    fullWidth
                    error={!!errors.postal_code}
                    helperText={errors.postal_code?.message}
                  />
                )}
              />
            </Grid>

            {/* City */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    placeholder="City"
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Grid>

            {/* District */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    placeholder="District"
                    fullWidth
                    error={!!errors.district}
                    helperText={errors.district?.message}
                  />
                )}
              />
            </Grid>

            {/* Country */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    size="small"
                    placeholder="Country"
                    fullWidth
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  />
                )}
              />
            </Grid>

            {/* Is Default Checkbox */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <FormControl error={!!errors.is_default}>
                <Controller
                  name="is_default"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={!!value} // Ensure it's a boolean
                          onChange={onChange}
                          color="primary"
                        />
                      }
                      label="Set as default address"
                    />
                  )}
                />
                {errors.is_default && (
                  <FormHelperText>{errors.is_default.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <Box sx={{ display: "flex", gap: 2, mt: 1, mb: 2 }}>
                <Button type="submit" variant="contained">
                  Save Address
                </Button>
                <Button type="button" variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AddAddressForm;
