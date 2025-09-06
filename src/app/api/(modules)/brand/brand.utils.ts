import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const brandSearchableFields = ["name", "description"];
export const brandSortableFields = [
  "name",
  "slug",
  "code",
  "products",
  "description",
  "created_at",
  "updated_at",
];

export const brandQueryValidationConfig: Record<string, any> = {
  sort_by: brandSortableFields,
  sort_order: SORT_ORDER_VALUE,
};
