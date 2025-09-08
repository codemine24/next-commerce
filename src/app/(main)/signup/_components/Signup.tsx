"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchemaType } from "@/zod/signup-schema";
import FormProvider from "@/components/ui/form/form-provider";
import { TextField } from "@/components/ui/form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import { useToast } from "@/providers/toast-provider";
import Link from "next/link";
import api from "@/lib/api";

export default function Signup() {
  const router = useRouter();
  const toast = useToast();
  const methods = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchemaType) => {
    const response = await api.post("/auth/register", {
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
      border="1px solid #ddd"
      borderRadius={2}
    >
      <Typography variant="h5" align="center" mb={2} fontWeight="bold">
        Create Account
      </Typography>

      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" gap={2}>
            <TextField disabled={methods.formState.isSubmitting} type="text" name="first_name" label="First Name" required />
            <TextField disabled={methods.formState.isSubmitting} type="text" name="last_name" label="Last Name" />
          </Box>

          <TextField disabled={methods.formState.isSubmitting} type="text" name="email" label="Email" required />
          <TextField disabled={methods.formState.isSubmitting} type="text" name="contact_number" label="Phone" />
          <TextField disabled={methods.formState.isSubmitting} type="password" name="password" label="Password" required />
          <TextField disabled={methods.formState.isSubmitting} type="password" name="confirm_password" label="Confirm Password" required />

          <Button disabled={methods.formState.isSubmitting} type="submit" variant="contained" sx={{ height: 50 }}>
            {methods.formState.isSubmitting
              ? <Box display="flex" alignItems="center" gap={2}><CircularProgress size={20} /> Loading...</Box>
              : "Register"}
          </Button>

          <Divider sx={{ my: 2, fontSize: 15 }}>
            Don&apos;t have an account?
            <Typography
              component={Link}
              variant="body2"
              href="/login"
              sx={{ ml: 1, "&:hover": { color: "primary.main", textDecoration: "underline" } }}
            >
              Login
            </Typography>
          </Divider>
        </Box>
      </FormProvider>
    </Box>
  );
}
