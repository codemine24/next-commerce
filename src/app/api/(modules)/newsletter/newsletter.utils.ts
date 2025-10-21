import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const subscriberSearchableFields = ["email"];
export const subscriberSortableFields = ["subscribed_at", "email"];

export const subscriberQueryValidationConfig: Record<string, any> = {
  sort_by: subscriberSortableFields,
  sort_order: SORT_ORDER_VALUE,
};
