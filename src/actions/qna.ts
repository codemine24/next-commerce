"use server";

import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";

type QuestionPayload = {
  question: string;
  product_id: string;
};

export const createQuestion = async (data: QuestionPayload) => {
  const response = await api.post(API_ROUTES.qna.create_question, {
    body: JSON.stringify(data),
  });
  return response;
};