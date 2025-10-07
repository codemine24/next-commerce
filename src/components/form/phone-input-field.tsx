"use client";

import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { isValidPhoneNumber } from "libphonenumber-js";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";
import { InputLabel } from "./input-label";

import "@/styles/phone-input.css";

type Props = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  sx?: SxProps<Theme>;
};

export const PhoneInputField = ({
  name,
  label,
  required,
  placeholder,
  helperText,
  sx,
}: Props) => {
  const { control } = useFormContext();

  return (
    <Box width="100%" sx={sx}>
      <InputLabel label={label} required={required} />
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const isValid = field.value ? isValidPhoneNumber(field.value) : false;

          return (
            <>
              <PhoneInput
                defaultCountry="US"
                placeholder={placeholder || "Enter phone number"}
                value={field.value}
                onChange={field.onChange}
                className={`phone-input ${error || (field.value && !isValid) ? "error" : ""
                  }`}
              />
              {(error?.message || (!isValid && field.value)) && (
                <Typography variant="caption" color="error">
                  {error?.message || "Invalid phone number"}
                </Typography>
              )}
              {!error && helperText && (
                <Typography variant="caption" color="text.secondary">
                  {helperText}
                </Typography>
              )}
            </>
          );
        }}
      />
    </Box>
  );
};
