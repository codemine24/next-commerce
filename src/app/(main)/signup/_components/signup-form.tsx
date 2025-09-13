"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";

import { TextField } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { SubmitButton } from "@/components/submit-button";
import { SignupSchemaType } from "@/zod/signup-schema";

interface SignupFormProps {
  methods: UseFormReturn<SignupSchemaType>;
  onSubmit: (data: SignupSchemaType) => void;
}

export const SignupForm = ({ methods, onSubmit }: SignupFormProps) => {
  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" gap={2}>
          <TextField
            disabled={methods.formState.isSubmitting}
            type="text"
            name="first_name"
            label="First Name"
            required
          />
          <TextField
            disabled={methods.formState.isSubmitting}
            type="text"
            name="last_name"
            label="Last Name"
          />
        </Box>

        <TextField
          disabled={methods.formState.isSubmitting}
          type="text"
          name="email"
          label="Email"
          required
        />
        <TextField
          disabled={methods.formState.isSubmitting}
          type="text"
          name="contact_number"
          label="Phone"
        />
        <TextField
          disabled={methods.formState.isSubmitting}
          type="password"
          name="password"
          label="Password"
          required
        />
        <TextField
          disabled={methods.formState.isSubmitting}
          type="password"
          name="confirm_password"
          label="Confirm Password"
          required
        />

        <SubmitButton
          isLoading={methods.formState.isSubmitting}
          label="Register"
        />

        <Divider sx={{ my: 2, fontSize: 15 }}>
          Already have an account?
          <Typography
            component={Link}
            variant="body2"
            href="/login"
            sx={{
              ml: 1,
              "&:hover": {
                color: "primary.main",
                textDecoration: "underline",
              },
            }}
          >
            Login
          </Typography>
        </Divider>
      </Box>
    </FormProvider>
  );
}
