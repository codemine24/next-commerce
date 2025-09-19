"use server";

import api from "@/lib/api";
import { revalidateTag } from "next/cache";
type ReviewPayload = {
  rating: number;
  comment: string;
  product_id: string;
};

export const addReView = async (data: ReviewPayload) => {
  console.log(data);

  const response = await api.post("/review", {
    body: JSON.stringify(data),
  });

  if (response.success) revalidateTag("reviews");
  console.log(response);

  return response;
};

export const getReviews = async (productId: string) => {
  const response = await api.get(`/review/${productId}`, {
    next: { tags: ["reviews"] },
  });

  console.log(response);
  return response;
};
