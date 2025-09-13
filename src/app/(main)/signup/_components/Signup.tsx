"use client";

import { signupSchema, SignupSchemaType } from "@/zod/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormProvider from "@/components/form/form-provider";
import { SubmitButton } from "@/components/submit-button";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { useToast } from "@/providers/toast-provider";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/form";

export default function Signup() {
  const router = useRouter();
  const toast = useToast();
  const methods = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchemaType) => {
    const response = await api.post(API_ROUTES.auth.register, {
      body: JSON.stringify({ ...data, confirm_password: undefined }),
    });

    if (!response.success) {
      toast.showMessage(response.message, "error");
      return;
    }

    toast.showMessage("User registered successfully", "success");
    router.replace("/login");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth="sm"
      mx="auto"
      p={4}
      border={1}
      borderColor="divider"
    >
      <Typography variant="h5" align="center" mb={2} fontWeight="bold">
        Create Account
      </Typography>

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
    </Box>
  );
}
