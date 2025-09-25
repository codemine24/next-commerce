import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const attributeSearchableFields = ["name"];
export const attributeSortableFields = [
  "name",
  "type",
  "created_at",
  "updated_at",
];

export const attributeQueryValidationConfig: Record<string, any> = {
  sort_by: attributeSortableFields,
  sort_order: SORT_ORDER_VALUE,
};
