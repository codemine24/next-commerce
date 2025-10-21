import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const paymentSearchableFields = ["transaction_id"];
export const paymentSortableFields = [
  "status",
  "amount",
  "paid_at",
  "created_at",
  "updated_at",
];

export const paymentQueryValidationConfig: Record<string, any> = {
  sort_by: paymentSortableFields,
  sort_order: SORT_ORDER_VALUE,
};
