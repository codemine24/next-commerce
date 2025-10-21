import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Popover, TextField, Typography } from "@mui/material";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { createAnswer } from "@/actions/qna";
import { SubmitButton } from "@/components/submit-button";
import { EditIcon } from "@/icons/edit";
import { Qna } from "@/interfaces/qna";
import { toast } from "@/lib/toast-store";
import {
  AnswerFormData,
  answerSchema,
} from "@/zod/question-schema";
 

interface AnswerFormPopoverProps {
  qna: Qna;
}

const AnswerFormPopover = ({ qna }: AnswerFormPopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnswerFormData>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("qna", qna.id);

  const onSubmit = async (data: AnswerFormData) => {
    startTransition(async () => {
      const res = await createAnswer(qna.id, data);
      if (res.success) {
        handleClose();
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <Button
        startIcon={<EditIcon />}
        variant="text"
        color="inherit"
        onClick={(event) => handleClick(event)}
        sx={{
          pl: 2,
          textTransform: "none",
          justifyContent: "flex-start",
        }}
      >
        Answer
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box p={1}>
          <Typography variant="h6" mb={1}>
            Answer
          </Typography>
          {/* <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            
          />
          <Box display="flex" gap={1} mt={1}>
            <Button variant="contained" color="primary">
              Submit
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
          </Box> */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              placeholder="Write your answer here..."
              {...register("answer")}
              error={!!errors.answer}
              helperText={errors.answer?.message}
            />

            <Box display="flex" gap={1} mt={1}>
              <SubmitButton
                label="Submit"
                type="submit"
                variant="contained"
                color="primary"
                loading={isPending}
              />
              <Button variant="outlined" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default AnswerFormPopover;