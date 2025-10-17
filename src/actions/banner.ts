"use server";

import { TAGS } from "@/constants/tags";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { AdvertiseSchema } from "@/zod/advertise-schema";

export const createAdvertise = async (advertise: AdvertiseSchema) => {
  const res = await api.post(API_ROUTES.advertise.create_advertise, {
    body: JSON.stringify(advertise),
    next: {
      tags: [TAGS.advertise],
    },
  });

  return res;
};
