"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
import { SearchParams } from "@/interfaces/common";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { makeQueryParams } from "@/utils/helper";
import { BlogSchema } from "@/zod/blog-schema";

export const getPosts = async (query?: SearchParams) => {
  let url = API_ROUTES.blog.get_posts;

  if (query && Object.keys(query).length > 0) {
    const queryParams = makeQueryParams(query);
    url += `?${queryParams}`;
  }

  const res = await api.get(url, {
    next: { tags: [TAGS.posts] },
  });
  return res;
};

export const getPostBySlug = async (slug: string) => {
  const res = await api.get(API_ROUTES.blog.get_post_by_slug(slug), {
    next: { tags: [TAGS.post] },
  });
  return res;
};

export const addPost = async (data: BlogSchema) => {
  const res = await api.post(API_ROUTES.blog.create_post, {
    body: JSON.stringify(data),
  });

  if (res.success) revalidateTag(TAGS.posts);
  return res;
};

export const editPost = async (slug: string, payload: BlogSchema) => {
  const res = await api.patch(API_ROUTES.blog.update_post(slug), {
    body: JSON.stringify(payload),
  });

  if (res.success) {
    revalidateTag(TAGS.posts);
    revalidateTag(TAGS.post);
  }

  return res;
};

export const deletePosts = async (ids: string[]) => {
  const res = await api.delete(API_ROUTES.blog.delete_posts, {
    body: JSON.stringify(ids),
  });

  if (res.success) {
    revalidateTag(TAGS.posts);
    revalidateTag(TAGS.post);
  }

  return res;
};
