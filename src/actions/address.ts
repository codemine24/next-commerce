"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
import { SearchParams } from "@/interfaces/common";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { makeQueryParams } from "@/utils/helper";
import { AddressSchema } from "@/zod/address-schema";

export const getAddresses = async (query?: SearchParams) => {
  let url = API_ROUTES.address.get_addresses;

  if (query && Object.keys(query).length > 0) {
    const queryParams = makeQueryParams(query);
    url += `?${queryParams}`;
  }

  const res = await api.get(url, {
    next: { tags: [TAGS.address] },
  });

  return res;
};

export const addAddresses = async (address: AddressSchema) => {
  const res = await api.post(API_ROUTES.address.create_address, {
    body: JSON.stringify(address),
  });

  if (res.success) revalidateTag(TAGS.address);

  return res;
};

export const updateAddress = async (id: string, address: AddressSchema) => {
  const res = await api.patch(API_ROUTES.address.update_address(id), {
    body: JSON.stringify(address),
  });

  if (res.success) revalidateTag(TAGS.address);

  return res;
};

export const deleteAddress = async (ids: string[]) => {
  const res = await api.delete(API_ROUTES.address.delete_address, {
    body: JSON.stringify({ ids }),
  });

  if (res.success) revalidateTag(TAGS.address);

  return res;
};
