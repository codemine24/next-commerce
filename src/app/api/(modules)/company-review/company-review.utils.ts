import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const companyReviewSortableFields = [
  "name",
  "email",
  "company",
  "designation",
  "comment",
  "rating",
  "created_at",
  "updated_at",
];

export const companyReviewSearchableFields = ["name", "comment"];

export const companyReviewQueryValidationConfig: Record<string, any> = {
  sort_by: companyReviewSortableFields,
  sort_order: SORT_ORDER_VALUE,
};
