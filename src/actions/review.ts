"use server";

import { revalidateTag } from "next/cache";

import api from "@/lib/api";
type ReviewPayload = {
  rating: number;
  comment: string;
  product_id: string;
};

export const addReView = async (data: ReviewPayload) => {
  const response = await api.post("/review", {
    body: JSON.stringify(data),
  });
  if (response.success) revalidateTag("reviews");
  return response;
};

export const getReviews = async (productId: string) => {
  const response = await api.get(`/review/${productId}`, {
    next: { tags: ["reviews"] },
  });
  return response;
};
