"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
import { SearchParams } from "@/interfaces/common";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { makeQueryParams } from "@/utils/helper";
import { ProductSchema } from "@/zod/product-schema";

const makePayload = (product: ProductSchema) => {
  return {
    ...product,
    categories: product?.categories?.map((category) => category.value),
  };
};

export const getProducts = async (query?: SearchParams) => {
  let url = API_ROUTES.products.get_products;

  if (query && Object.keys(query).length > 0) {
    const queryParams = makeQueryParams(query);
    url += `?${queryParams}`;
  }

  console.log(url);

  const res = await api.get(url, {
    next: { tags: [TAGS.products] },
  });
  return res;
};

export const getProductBySlug = async (slug: string) => {
  const res = await api.get(API_ROUTES.products.get_product_by_slug(slug), {
    next: { tags: [TAGS.product] },
  });
  return res;
};

export const addProduct = async (product: ProductSchema) => {
  const res = await api.post(API_ROUTES.products.create_product, {
    body: JSON.stringify(makePayload(product)),
  });

  if (res.success) revalidateTag(TAGS.products);
  return res;
};

export const editProduct = async (slug: string, product: ProductSchema) => {
  const res = await api.patch(API_ROUTES.products.update_product(slug), {
    body: JSON.stringify(makePayload(product)),
  });

  if (res.success) {
    revalidateTag(TAGS.products);
    revalidateTag(TAGS.product);
  }

  return res;
};

export const deleteProduct = async (ids: string[]) => {
  const res = await api.delete(API_ROUTES.products.delete_product, {
    body: JSON.stringify(ids),
  });

  if (res.success) {
    revalidateTag(TAGS.products);
    revalidateTag(TAGS.product);
  }

  return res;
};
