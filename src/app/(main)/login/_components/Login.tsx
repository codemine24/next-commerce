"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { loginSchema, LoginSchemaType } from "@/zod/login-Schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/providers/toast-provider";
import { TextField } from "@/components/ui/form/text-field";
import api from "@/lib/api";
import FormProvider from "@/components/ui/form/form-provider";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button, Divider } from "@mui/material";

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const methods = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    const response = await api.post("/auth/login", {
      body: JSON.stringify(data),
    });

    if (!response.success) {
      toast.showMessage(response.message, "error");
      return;
    }

    toast.showMessage("User logged in successfully", "success");
    router.replace("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={450}
      mx="auto"
      p={4}
      border={1}
      borderColor="divider"
    >
      <Typography variant="h5" align="center" mb={2} fontWeight="bold">
        Account Login
      </Typography>

      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField disabled={methods.formState.isSubmitting} type="text" name="email" label="Email" required />
          <Box>
            <TextField disabled={methods.formState.isSubmitting} type="password" name="password" label="Password" required />
            <Typography variant="body2" sx={{ textAlign: "right", mt: 1, ":hover": { color: "primary.main", textDecoration: "underline" } }}>
              <Link href="/forget-password">
                Forgotten Password?
              </Link>
            </Typography>
          </Box>

          <SubmitButton isLoading={methods.formState.isSubmitting} label="Login" />
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
    </Box>
  );
}
