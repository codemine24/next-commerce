"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
import { SearchParams } from "@/interfaces/common";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { makeQueryParams } from "@/utils/helper";
import { CategorySchema } from "@/zod/category-schema";

export const getCategories = async (queries?: SearchParams) => {
  let url = API_ROUTES.categories.get_categories;

  if (queries && Object.keys(queries).length > 0) {
    const queryParams = makeQueryParams(queries);
    url += `?${queryParams}`;
  }

  const res = await api.get(url, { next: { tags: [TAGS.categories] } });
  return res;
};

export const addCategory = async (category: CategorySchema) => {
  const res = await api.post(API_ROUTES.categories.create_category, {
    body: JSON.stringify(category),
  });

  if (res.success) revalidateTag(TAGS.categories);

  return res;
};

export const updateCategory = async (
  id: string,
  category: Partial<CategorySchema>
) => {
  const res = await api.patch(API_ROUTES.categories.update_category(id), {
    body: JSON.stringify(category),
  });

  if (res.success) revalidateTag(TAGS.categories);
  return res;
};

export const deleteCategory = async (ids: string[]) => {
  const res = await api.delete(API_ROUTES.categories.delete_category, {
    body: JSON.stringify({ ids }),
  });

  if (res.success) revalidateTag(TAGS.categories);
  return res;
};
