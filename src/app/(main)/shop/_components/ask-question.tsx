"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { getProductBySlug } from "@/actions/product";
import { createQuestion } from "@/actions/qna";
import { SubmitButton } from "@/components/submit-button";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/lib/toast-store";
import { QuestionFormData, questionSchema } from "@/zod/question-schema";

import { ProductSectionHeader } from "../../[slug]/_components/product-section-header";

export const AskQuestion = () => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const path = usePathname();
  const [isLoading, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
  });

  const onSubmit = async (data: QuestionFormData) => {
    console.log("data....", data);

    if (!isAuthenticated) {
      toast.error("You must be logged in to ask a question");
      router.push(`/login?redirect=${encodeURIComponent(path)}`);
      return;
    }
    startTransition(async () => {
      const product = await getProductBySlug(path);
      const response = await createQuestion({
        question: data.question,
        product_id: product.data.id,
      });
      console.log("Response", response);
      if (response.success) {
        toast.success(response.message);
        reset();
      } else {
        toast.error(response.message);
      }
    });
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
      {user?.role !== "ADMIN" && user?.role !== "SUPER_ADMIN" && (
        <Box>
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

            <SubmitButton
              label="Submit"
              isLoading={isLoading}
              disabled={isLoading}
              sx={{
                width: "225px",
                height: "48px",
                fontSize: "16px",
                fontWeight: 400,
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
