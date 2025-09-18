"use server";

import api from "@/lib/api";
import { ReviewSchemaType } from "@/zod/review-schema";

export const addReView = async (data: ReviewSchemaType) => {
  console.log(data);

  const response = await api.post("/review", {
    body: JSON.stringify(data),
  });
  console.log(response.data);

  return response;
};
