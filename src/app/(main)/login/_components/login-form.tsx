"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";

import FormProvider from "@/components/form/form-provider";
import { TextField } from "@/components/form/text-field";
import { SubmitButton } from "@/components/submit-button";
import { LoginSchemaType } from "@/zod/login-schema";

interface LoginFormProps {
  methods: UseFormReturn<LoginSchemaType>;
  onSubmit: (data: LoginSchemaType) => void;
}

export const LoginForm = ({ methods, onSubmit }: LoginFormProps) => {
  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          disabled={methods.formState.isSubmitting}
          type="text"
          name="email"
          label="Email"
          required
        />
        <Box>
          <TextField
            disabled={methods.formState.isSubmitting}
            type="password"
            name="password"
            label="Password"
            required
          />
          <Typography
            variant="body2"
            sx={{
              textAlign: "right",
              mt: 1,
              ":hover": {
                color: "primary.main",
                textDecoration: "underline",
              },
            }}
          >
            <Link href="/forget-password">Forgotten Password?</Link>
          </Typography>
        </Box>

        <SubmitButton
          isLoading={methods.formState.isSubmitting}
          label="Login"
        />
      </Box>

      <Divider sx={{ my: 2 }}>Don&apos;t have an account?</Divider>

      {/* Create Account Button */}
      <Button
        component={Link}
        href="/signup"
        variant="outlined"
        fullWidth
        sx={{ mt: 1 }}
      >
        Create Your Account
      </Button>
    </FormProvider>
  );
}
