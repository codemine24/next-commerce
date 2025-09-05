import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const categorySearchableFields = ["title", "description"];
export const categorySortableFields = [
  "title",
  "code",
  "slug",
  "description",
  "products",
  "created_at",
  "updated_at",
];

export const categoryQueryValidationConfig: Record<string, any> = {
  sort_by: categorySortableFields,
  sort_order: SORT_ORDER_VALUE,
};
