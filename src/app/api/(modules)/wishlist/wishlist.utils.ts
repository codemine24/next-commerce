import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const wishlistSortableFields = [
  "created_at",
  "product_name",
  "product_price",
];

export const wishlistQueryValidationConfig: Record<string, any> = {
  sort_by: wishlistSortableFields,
  sort_order: SORT_ORDER_VALUE,
};
