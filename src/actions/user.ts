"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
import { SearchParams } from "@/interfaces/common";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { makeQueryParams } from "@/utils/helper";
import { SignupSchemaType } from "@/zod/signup-schema";
import { UpdateProfileSchemaType } from "@/zod/update-profile-schema";

export const getUsers = async (query?: SearchParams) => {
  let url = API_ROUTES.users.get_users;

  if (query && Object.keys(query).length > 0) {
    const queryParams = makeQueryParams(query);
    url += `?${queryParams}`;
  }

  const res = await api.get(url, {
    next: { tags: [TAGS.users] },
  });
  return res;
};

export const createUser = async (user: SignupSchemaType) => {
  const res = await api.post(API_ROUTES.users.create_user, {
    body: JSON.stringify(user),
  });

  if (res.success) revalidateTag(TAGS.users);

  return res;
};

export const updateProfile = async (data: UpdateProfileSchemaType) => {
  const formData = new FormData();

  if (data?.avatar) {
    formData.append("avatar", data.avatar);
  }

  const payload = {
    first_name: data.first_name,
    last_name: data.last_name,
    contact_number: data.contact_number,
  };

  formData.append("data", JSON.stringify(payload));

  const res = await api.patch(API_ROUTES.users.update_profile, {
    body: formData,
  });

  if (res.success) revalidateTag(TAGS.users);

  return res;
};
