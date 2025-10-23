"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
import { SearchParams } from "@/interfaces/common";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { makeQueryParams } from "@/utils/helper";
import { CompanyReviewSchema } from "@/zod/company-review-schema";

export const getCompanyReviews = async (query?: SearchParams) => {
  let url = API_ROUTES.companyReview.get_company_reviews;

  if (query && Object.keys(query).length > 0) {
    const queryParams = makeQueryParams(query);
    url += `?${queryParams}`;
  }

  const res = await api.get(url, {
    next: { tags: [TAGS.company_review] },
  });
  return res;
};

export const addCompanyReview = async (data: CompanyReviewSchema) => {
  const res = await api.post(API_ROUTES.companyReview.create_company_review, {
    body: JSON.stringify(data),
  });

  if (res.success) revalidateTag(TAGS.company_review);
  return res;
};

export const editCompanyReview = async (
  id: string,
  data: CompanyReviewSchema
) => {
  const res = await api.patch(
    API_ROUTES.companyReview.update_company_review(id),
    {
      body: JSON.stringify(data),
    }
  );

  if (res.success) {
    revalidateTag(TAGS.company_review);
  }

  return res;
};

export const deleteCompanyReviews = async (ids: string[]) => {
  const res = await api.delete(
    API_ROUTES.companyReview.delete_company_reviews,
    {
      body: JSON.stringify(ids),
    }
  );

  if (res.success) {
    revalidateTag(TAGS.company_review);
  }

  return res;
};
