"use server";

import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { AdvertisementSchema } from "@/zod/banner-schema";
import { TAGS } from "@/constants/tags";

export const createBanner = async (banner: AdvertisementSchema) => {
  const res = await api.post(API_ROUTES.banner.create_banner, {
    body: JSON.stringify(banner),
    next: {
      tags: [TAGS.banner],
    },
  });

  return res;
};
