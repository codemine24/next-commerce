"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { addReView } from "@/actions/review";
import { useAuth } from "@/hooks/use-auth";
import { CloseIcon } from "@/icons/close";
import { PlusIcon } from "@/icons/plus";
import { toast } from "@/lib/toast-store";
import { reviewSchema, ReviewSchemaType } from "@/zod/review-schema";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
};

interface ProductAddReviewProps {
  productId: string;
}

export const ProductAddReview = ({ productId }: ProductAddReviewProps) => {
  const router = useRouter();
  const path = usePathname();
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ReviewSchemaType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const handleOpenReviewModal = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=${path}`);
    } else {
      setOpen(true);
    }
  };

  const handleCloseReviewModal = () => {
    setOpen(false);
    reset();
  };

  const handleAddReview = async (data: ReviewSchemaType) => {
    const response = await addReView({ ...data, product_id: productId });
    console.log(response);

    if (!response.success) {
      toast.error(response.message || "Failed to add review");
      return;
    }

    toast.success("Review submitted successfully");
    reset();
    setOpen(false);
    console.log(data);
  };

  return (
    <>
      <Button
        variant="soft"
        startIcon={<PlusIcon />}
        onClick={handleOpenReviewModal}
      >
        Add Review
      </Button>

      <Modal
        open={open}
        onClose={handleCloseReviewModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
        aria-labelledby="modal-modal-title"
      >
        <Fade in={open} timeout={500}>
          <Box sx={style}>
            {/* Header */}
            <Box
              px={2}
              py={1}
              borderBottom={1}
              borderColor="divider"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography id="modal-modal-title" variant="body1">
                Add Review
              </Typography>
              <IconButton onClick={handleCloseReviewModal}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Form */}
            <Box
              p={2}
              component="form"
              onSubmit={handleSubmit(handleAddReview)}
            >
              <Typography variant="body1">Rate this product</Typography>

              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Rating
                    {...field}
                    precision={0.5}
                    onChange={(_, value) => field.onChange(value)}
                    sx={{ mt: 2 }}
                  />
                )}
              />
              {errors.rating && (
                <Typography color="error" variant="caption">
                  {errors.rating.message}
                </Typography>
              )}

              <Box mt={2}>
                <Controller
                  name="comment"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Write your review here"
                      error={!!errors.comment}
                      helperText={errors.comment?.message}
                    />
                  )}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
