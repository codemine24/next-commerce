import { z } from "zod";

export const questionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email").optional(),
  question: z.string().min(1, "Question is required"),
});

export const answerSchema = z.object({
  answer: z.string().min(1, "Answer is required"),
});

export type QuestionFormData = z.infer<typeof questionSchema>;
export type AnswerFormData = z.infer<typeof answerSchema>;
