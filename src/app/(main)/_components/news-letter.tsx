"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";

import { createOtpForNewsletter } from "@/actions/newsletter";
import {
  EmailFormValues,
  NewsletterEmailSchema,
} from "@/zod/newsletter-schema";

import { OTPForm } from "./otp-form";



export const NewsLetter = () => {
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(NewsletterEmailSchema),
  });

  const onSubmitEmail = async (data: EmailFormValues) => {
    const res = await createOtpForNewsletter(data.email)
    console.log(res);
    
  };
  return (
    <Box
      my={5}
      sx={{
        bgcolor: "#03140E",
        height: { xs: "auto", md: 150 },
        width: "100%",
        display: "flex",
        alignItems: "center",
        p: 4,
      }}
    >
      <Box
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="end"
        gap={4}
        width="100%"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Box flex={1}>
          <Typography variant="h3" fontWeight={600}>
            Don&apos;t miss out on the latest trends and offers
          </Typography>
          <Typography variant="body1" color="white" mt={2}>
            Subscribe to our newsletter to get the latest updates on new
            arrivals, special offers, and more.
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleEmailSubmit(onSubmitEmail)}>
          <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent={"end"}
          >
            <Box>
              <TextField
                placeholder="Enter your email"
                {...registerEmail("email")}
                error={!!emailErrors.email}
                sx={{
                  bgcolor: "white",
                  "& .MuiOutlinedInput-root": {
                    height: 50,
                    "&:hover fieldset": {
                      border: 0,
                      boxShadow: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: 0,
                      boxShadow: "none",
                    },
                  },
                }}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                height: 50,
                width: 200,
              }}
            >
              Subscribe
            </Button>
          </Box>
          <Typography color="error">{emailErrors.email?.message}</Typography>
        </Box>
          <OTPForm />
        
      </Box>
    </Box>
  );
};