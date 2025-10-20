"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
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

  if (response.success) revalidateTag(TAGS.qnas);

  return response;
};

export const updateQnAByAdmin = async (
  id: string,
  payload: Record<string, any>
) => {
  const response = await api.put(API_ROUTES.qna.update_qna_by_admin(id), {
    body: JSON.stringify(payload),
  });
  return response;
};

export const editQuestion = async (
  id: string,
  payload: Record<string, any>
) => {
  const response = await api.patch(API_ROUTES.qna.edit_question(id), {
    body: JSON.stringify(payload),
  });

  if (response.success) revalidateTag(TAGS.qnas);

  console.log("editQuestion", response);
  return response;
};

export const deleteQnas = async ({ ids }: { ids: string[] }) => {
  const response = await api.delete(API_ROUTES.qna.delete_qnas, {
    body: JSON.stringify({ ids }),
  });

  if (response.success) revalidateTag(TAGS.qnas);
  return response;
};

export const getQnAs = async (query: Record<string, any>) => {
  const queryString = new URLSearchParams({
    ...query,
    inquirer_id: query.inquirer_id,
  }).toString();

  const response = await api.get(`${API_ROUTES.qna.get_qnas}?${queryString}`, {
    next: { tags: [TAGS.qnas] },
  });

  return response;
};