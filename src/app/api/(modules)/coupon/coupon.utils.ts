import { BeneficiaryType, DiscountType } from "@prisma/client";

import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const couponSortableFields = [
  "code",
  "discount_type",
  "discount_value",
  "maximum_value",
  "start_date",
  "expiration_date",
  "usage_limit",
  "per_user_limit",
  "min_order_amount",
  "beneficiary_type",
  "is_active",
  "created_at",
  "updated_at",
];

export const couponSearchableFields = ["code"];

export const couponFilterableFields = [
  "discount_type",
  "beneficiary_type",
  "is_active",
  "min_value",
  "max_value",
  "search_term",
  "page",
  "limit",
  "sort_by",
  "sort_order",
];

export const couponQueryValidationConfig: Record<string, any> = {
  discount_type: Object.values(DiscountType),
  beneficiary_type: Object.values(BeneficiaryType),
  is_active: ["true", "false"],
  sort_by: couponSortableFields,
  sort_order: SORT_ORDER_VALUE,
};
