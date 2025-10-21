"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";

export const addToWishlist = async (id: string) => {
  const res = await api.post(API_ROUTES.wishlist.add_to_wishlist, {
    body: JSON.stringify({
      product_id: id,
    }),
  });

  if (res.success) {
    revalidateTag(TAGS.wishlist);
  }

  console.log("post response is", res);

  return res;
};

export const getWishlist = async () => {
  const url = API_ROUTES.wishlist.get_wishlist;
  const res = await api.get(url, {
    next: { tags: [TAGS.wishlist] },
  });
  return res;
};


export const removeFromWishlist = async (ids: string[]) => {
  const res = await api.delete(API_ROUTES.wishlist.remove_from_wishlist, {
    body: JSON.stringify({
      ids: ids,
    }),
  });
  if (res.success) {
    revalidateTag(TAGS.wishlist);
  }

  console.log("delete response is", res);
  return res;
};