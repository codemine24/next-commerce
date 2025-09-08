"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";

import { VisibilityOff } from "@/icons/visibility-off";
import { Visibility } from "@/icons/visibility";
import { signupSchema, SignupSchemaType } from "@/zod/signup-schema";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const onSubmit = (data: SignupSchemaType) => {
    console.log("Signup Data:", data);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={400}
      mx="auto"
      p={4}
      border="1px solid #ddd"
      borderRadius={2}
    >
      <Typography variant="h5" align="center" mb={2} fontWeight="bold">
        Create Account
      </Typography>

      {/* Full Name */}
      <TextField
        label="Full Name"
        placeholder="Full Name"
        fullWidth
        margin="normal"
        {...register("fullName")}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
      />

      {/* Email */}
      <TextField
        label="Email"
        placeholder="Email"
        fullWidth
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      {/* Phone */}
      <TextField
        label="Phone"
        placeholder="Phone"
        fullWidth
        margin="normal"
        {...register("phone")}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />

      {/* Password */}
      <FormControl
        variant="outlined"
        error={!!errors.password}
        margin="normal"
        fullWidth
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
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

      <FormControl
        variant="outlined"
        error={!!errors.confirmPassword}
        fullWidth
        margin="normal"
      >
        <InputLabel htmlFor="outlined-adornment-password">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword
                    ? "hide the confirm password"
                    : "display the confirm password"
                }
                onClick={handleClickConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
        />
        <FormHelperText>{errors.password?.message}</FormHelperText>
      </FormControl>

      {/* Signup Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3, borderRadius: 2 }}
        onClick={handleSubmit(onSubmit)}
      >
        Signup
      </Button>
    </Box>
  );
}
