import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const blogSortableFields = [
  "title",
  "content",
  "created_at",
  "updated_at",
];

export const blogSearchableFields = ["title", "tags", "content"];

export const blogQueryValidationConfig: Record<string, any> = {
  sort_by: blogSortableFields,
  sort_order: SORT_ORDER_VALUE,
};
