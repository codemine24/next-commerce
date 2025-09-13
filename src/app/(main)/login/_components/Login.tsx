"use client";

import FormProvider from "@/components/form/form-provider";
import { TextField } from "@/components/form/text-field";
import { SubmitButton } from "@/components/submit-button";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { useAuth } from "@/providers/auth-provider";
import { loginSchema, LoginSchemaType } from "@/zod/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter();
  const { setIsAuthenticated, setUser } = useAuth();
  const methods = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    const response = await api.post(API_ROUTES.auth.login, {
      body: JSON.stringify(data),
    });

    if (!response.success) {
      return;
    }

    setIsAuthenticated(true);
    setUser(response.data);
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
    </Box>
  );
}
