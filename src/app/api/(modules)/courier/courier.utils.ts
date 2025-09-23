import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const courierSearchableFields = [
  "name",
  "address",
  "email",
  "contact_number",
];
export const courierSortableFields = ["name", "created_at"];

export const courierQueryValidationConfig: Record<string, any> = {
  sort_by: courierSortableFields,
  sort_order: SORT_ORDER_VALUE,
};
