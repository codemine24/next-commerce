"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { deleteQnas, editQuestion } from "@/actions/qna";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { SubmitButton } from "@/components/submit-button";
import { DeleteIcon } from "@/icons/delete-icon";
import { EditIcon } from "@/icons/edit";
import { toast } from "@/lib/toast-store";
import { QuestionFormData, questionSchema } from "@/zod/question-schema";

export type QuestionCardProps = {
  question: any;
  authUserId?: string;
};

export const QuestionCard = ({ question, authUserId }: QuestionCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const createdAt = dayjs(question.created_at).format("YYYY-MM-DD");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: question,
    },
  });


  const isEditor = authUserId === question.inquirer.id;

  const handleEdit = () => {
    setIsEditing(true);
    reset({ question: question.question });
  };

  const handleDelete = async () => {
    startTransition(async () => {
      const response = await deleteQnas({ ids: [question.id] });
      if (response.success) {
        toast.success(response.message);
        setIsEditing(false);
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset({ question: question.question });
  };

  const onSubmit = async (data: QuestionFormData) => {
    startTransition(async () => {
      const response = await editQuestion(question.id, data);
      if (response.success) {
        toast.success(response.message);
        setIsEditing(false);
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
    <Box role="article" aria-label={`Question: ${question}`} sx={{ py: 1 }}>
      <Stack spacing={1.5}>
        <Box>
          {isEditing ? (
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ flex: 1 }}
            >
              <TextField
                placeholder="Edit your question..."
                fullWidth
                size="small"
                multiline
                rows={3}
                {...register("question")}
                error={!!errors.question}
                helperText={errors.question?.message}
                sx={textFieldStyle}
                disabled={isPending}
              />
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <SubmitButton
                  label="Update"
                  isLoading={isPending}
                  disabled={isPending}
                />
                <Button
                  type="button"
                  variant="outlined"
                  color="inherit"
                  size="small"
                  onClick={handleCancel}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          ) : (
            <Stack direction="row" spacing={1.25} alignItems="baseline">
              <Typography
                component="span"
                sx={{ fontSize: 16, fontWeight: 600 }}
              >
                {"Q."}
              </Typography>
              <Typography
                component="h3"
                variant="subtitle1"
                sx={{ fontSize: 16, fontWeight: 600 }}
              >
                {question.question}
                {isEditor && (
                  <>
                  <IconButton
                    size="small"
                    onClick={handleEdit}
                    aria-label="Edit question"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setOpenDeleteModal(true)}
                    aria-label="Edit question"
                    color="error"
                  >
                    <DeleteIcon fontSize="small"/>
                  </IconButton></>
                  
                )}                
              </Typography>
            </Stack>
          )}
        </Box>

        <Typography
          variant="body2"
          sx={{ color: "#A4B2AE", display: "block", fontWeight: 400 }}
        >
          {`By ${question.inquirer.first_name} |  ${createdAt}`}
        </Typography>

        <Box>
          <Typography variant="body1" sx={{ color: "text.primary" }}>
            {question.answer}
          </Typography>
        </Box>
      </Stack>
      {openDeleteModal && (
        <ConfirmDialog
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          title="Delete Question"
          description="Are you sure you want to delete this question?"
          onConfirm={handleDelete}
          loading={isPending}
        />
      )}
    </Box>
  );
};