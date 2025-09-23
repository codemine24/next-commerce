import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const qnaSearchableFields = ["question", "answer"];
export const qnaSortableFields = [
  "question",
  "answer",
  "created_at",
  "updated_at",
];

export const qnaQueryValidationConfig: Record<string, any> = {
  sort_by: qnaSortableFields,
  sort_order: SORT_ORDER_VALUE,
};
