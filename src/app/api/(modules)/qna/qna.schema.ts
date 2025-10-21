import { z } from "zod";

const createQuestion = z.object({
  body: z
    .object({
      question: z
        .string({
          error: "Question should be a text",
        })
        .min(1, "Question is required"),
      product_id: z.uuid({ error: "Product id should be a valid uuid" }),
    })
    .strict(),
});

const updateQnAByAdmin = z.object({
  body: z
    .object({
      answer: z
        .string({
          error: "Answer should be a text",
        })
        .optional(),
      is_approved: z
        .boolean({ error: "Is approved should be a boolean" })
        .optional(),
    })
    .strict(),
});

const editQuestion = z.object({
  body: z
    .object({
      question: z.string({
        error: "Question should be a text",
      }),
    })
    .strict(),
});

export const QnASchemas = {
  createQuestion,
  updateQnAByAdmin,
  editQuestion,
};