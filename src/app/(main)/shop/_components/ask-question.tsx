"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { questionSchema, QuestionFormData } from "@/zod/question-schema";


import { ProductSectionHeader } from "../../[slug]/_components/product-section-header";

export const AskQuestion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
  });

  const onSubmit = (data: QuestionFormData) => {
    console.log("Form submitted:", data);
    reset();
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      border: "1px solid #D3E5E0",
      "& fieldset": { border: "none" },
      "&:hover fieldset": { border: "none" },
      "&.Mui-focused fieldset": { border: "none" },
    },
  };

  return (
    <>
      <ProductSectionHeader title="Ask a question" />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* Name */}
        {/* <TextField
          placeholder="Your Name"
          fullWidth
          size="small"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={textFieldStyle}
        /> */}

        {/* Email */}
        {/* <TextField
          placeholder="E-mail (optional)"
          fullWidth
          size="small"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={textFieldStyle}
        /> */}

        {/* Question */}
        <TextField
          placeholder="Write your question here..."
          fullWidth
          size="small"
          multiline
          rows={4}
          {...register("question")}
          error={!!errors.question}
          helperText={errors.question?.message}
          sx={textFieldStyle}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: "225px",
            height: "48px",
            fontSize: "16px",
            fontWeight: 400,
          }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};