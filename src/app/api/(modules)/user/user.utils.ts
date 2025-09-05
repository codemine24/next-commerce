import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const userSortableFields = [
  "first_name",
  "last_name",
  "email",
  "created_at",
  "updated_at",
];

export const userSearchableFields = [
  "first_name",
  "last_name",
  "email",
  "contact_number",
];

export const userQueryValidationConfig: Record<string, any> = {
  sort_by: userSortableFields,
  sort_order: SORT_ORDER_VALUE,
};
