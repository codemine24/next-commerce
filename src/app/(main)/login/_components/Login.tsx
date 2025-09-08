"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Link,
} from "@mui/material";
import { loginSchema, LoginSchemaType } from "@/zod/login-Schema";
import { BORDER_RADIUS } from "@/theme";
import { useState } from "react";
import { VisibilityOff } from "@/icons/visibility-off";
import { Visibility } from "@/icons/visibility";
import NextLink from "next/link";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = (data: LoginSchemaType) => {
    console.log("Form Data:", data);
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      maxWidth={400}
      mx="auto"
      p={4}
      border="1px solid #ddd"
      borderRadius={BORDER_RADIUS.default}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" align="center" mb={2} fontWeight="bold">
        Account Login
      </Typography>

      {/* Email */}
      <TextField
        label="E-Mail"
        placeholder="E-Mail"
        fullWidth
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      {/* Password */}
      <FormControl
        variant="outlined"
        error={!!errors.password}
        margin="normal"
        fullWidth
      >
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        <FormHelperText>{errors.password?.message}</FormHelperText>
      </FormControl>

      {/* Forgotten Password */}
      <Box display="flex" justifyContent="flex-end">
        <Link
          component={NextLink}
          href="/forget-password"
          sx={{ fontSize: "0.9rem" }}
          underline="hover"
        >
          Forgotten Password?
        </Link>
      </Box>

      {/* Login Button */}
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>

      <Divider sx={{ my: 2 }}>Don't have an account?</Divider>

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
    </Box>
  );
}
