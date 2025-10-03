"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
import { SearchParams } from "@/interfaces/common";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { makeQueryParams } from "@/utils/helper";
import { AttributeSchema } from "@/zod/attribute-schema";

export const getAttributes = async (queries?: SearchParams) => {
  let url = API_ROUTES.attributes.get_attributes;

  if (queries && Object.keys(queries).length > 0) {
    const queryParams = makeQueryParams(queries);
    url += `?${queryParams}`;
  }

  const res = await api.get(url, { next: { tags: [TAGS.attributes] } });
  return res;
};

export const createAttribute = async (data: AttributeSchema) => {
  const res = await api.post(API_ROUTES.attributes.create_attribute, {
    body: JSON.stringify(data),
  });

  if (res.success) revalidateTag(TAGS.attributes);
  return res;
};

export const updateAttribute = async (id: string, data: AttributeSchema) => {
  const res = await api.patch(API_ROUTES.attributes.update_attribute(id), {
    body: JSON.stringify(data),
  });

  if (res.success) {
    revalidateTag(TAGS.attributes);
  }
  return res;
};

export const deleteAttribute = async (ids: string[]) => {
  const res = await api.delete(API_ROUTES.attributes.delete_attribute, {
    body: JSON.stringify({ ids }),
  });

  if (res.success) {
    revalidateTag(TAGS.attributes);
  }
  return res;
};
