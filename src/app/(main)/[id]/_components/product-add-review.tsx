"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { addReView } from "@/actions/review";
import { CloseIcon } from "@/icons/close";
import { PlusIcon } from "@/icons/plus";
import { toast } from "@/lib/toast-store";
import { reviewSchema, ReviewSchemaType } from "@/zod/review-schema";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

export const ProductAddReview = () => {
  const router = useRouter();
  const path = usePathname();
  const isAuthenticated = true;
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(5);
  const [comment, setComment] = useState<string>("");

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
    setComment("");
    setRating(5);
  };

  const handleAddReview = async (data: ReviewSchemaType) => {
    const response = await addReView(data);
    console.log(response.data);
    if (!response.success) {
      toast.error(response.message || "Failed to add review");
      return;
    }
    toast.success("Review submitted successfully");
    reset(), setOpen(false);
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
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open} timeout={500}>
          <Box sx={style}>
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

            {/* <Box p={2}>
              <Typography variant="body1">Rate this product</Typography>

              <MuiRating
                value={rating}
                precision={0.5}
                onChange={(event, newValue) => setRating(newValue)}
                readOnly={false}
                sx={{ mt: 2 }}
              />

              <Box mt={2}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="outlined-basic"
                  placeholder="Write your review here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleAddReview}
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Box> */}
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
