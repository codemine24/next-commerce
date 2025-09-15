"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { CustomerFormData, customerSchema } from "@/zod/customer-schema";

const CustomerInformation: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      mobile: "",
      email: "",
      upazilla: "",
      district: "",
      comment: "",
    },
  });

  const onSubmit = (data: CustomerFormData) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <Typography variant="h6" gutterBottom>
        <Box
          component="span"
          sx={{
            bgcolor: alpha("rgb(255, 0, 0)", 0.1),
            color: "rgb(255, 0, 0)",
            borderRadius: "50px",
            width: "30px",
            height: "30px",
            display: "inline-block",
            textAlign: "center",
            lineHeight: "30px",
            mr: 1,
          }}
        >
          1
        </Box>
        Customer Information
      </Typography>

      {/* First Name */}
      <Typography variant="body2" fontWeight={500}>
        First name
      </Typography>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Enter your first name"
            fullWidth
            size="small"
            margin="dense"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        )}
      />

      {/* Last Name */}
      <Typography variant="body2" fontWeight={500}>
        Last name
      </Typography>
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Enter your last name"
            fullWidth
            size="small"
            margin="dense"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        )}
      />

      {/* Address */}
      <Typography variant="body2" fontWeight={500}>
        Address
      </Typography>
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Enter your address"
            fullWidth
            size="small"
            margin="dense"
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        )}
      />

      {/* Mobile */}
      <Typography variant="body2" fontWeight={500}>
        Mobile
      </Typography>
      <Controller
        name="mobile"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Enter your mobile number"
            fullWidth
            size="small"
            margin="dense"
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
          />
        )}
      />

      {/* Email */}
      <Typography variant="body2" fontWeight={500}>
        Email
      </Typography>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Enter your email"
            fullWidth
            size="small"
            margin="dense"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      {/* Upazilla */}
      <Typography variant="body2" fontWeight={500}>
        Upazilla / Thana
      </Typography>
      <Controller
        name="upazilla"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Enter your upazilla / thana"
            fullWidth
            size="small"
            margin="dense"
            error={!!errors.upazilla}
            helperText={errors.upazilla?.message}
          />
        )}
      />

      {/* District */}
      <Typography variant="body2" fontWeight={500}>
        District
      </Typography>
      <Controller
        name="district"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            size="small"
            margin="dense"
            error={!!errors.district}
          >
            <Select {...field} displayEmpty>
              <MenuItem value="">
                <em>Select district</em>
              </MenuItem>
              <MenuItem value="dhaka">Dhaka</MenuItem>
              <MenuItem value="chattogram">Chattogram</MenuItem>
              <MenuItem value="rajshahi">Rajshahi</MenuItem>
            </Select>
            {errors.district && (
              <Typography variant="caption" color="error">
                {errors.district.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      {/* Comment */}
      <Typography variant="body2" fontWeight={500}>
        Comment
      </Typography>
      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Any additional comments"
            fullWidth
            size="small"
            margin="dense"
            multiline
            rows={3}
          />
        )}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default CustomerInformation;
