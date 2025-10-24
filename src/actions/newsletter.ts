"use server";

import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";

export const createOtpForNewsletter = async (email: string) => {
  
  const res = await api.post(API_ROUTES.newsletter.create_otp, {
    body: JSON.stringify({ email }),
  });

  return res;
};

export const verifyOtpForNewsletter = async (email: string, otp: number) => {
  
  const res = await api.post(API_ROUTES.newsletter.subscribe, {
    body: JSON.stringify({ email, otp }),
  });

  return res;
};




