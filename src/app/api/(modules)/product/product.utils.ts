import { UserRole, UserStatus } from "@prisma/client";

import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const productSortableFields = [
  "name",
  "price",
  "discount_price",
  "stock",
  "created_at",
  "updated_at",
];

export const productSearchableFields = [
  "name",
  "model",
  "product_code",
  "description",
];

export const productQueryValidationConfig: Record<string, any> = {
  sort_by: productSortableFields,
  sort_order: SORT_ORDER_VALUE,
  role: Object.values(UserRole),
  status: Object.values(UserStatus),
};

export const brandSelectFieldsWithProduct = {
  id: true,
  name: true,
  slug: true,
  icon: true,
};

export const categorySelectFieldsWithProduct = {
  id: true,
  title: true,
  slug: true,
  icon: true,
};
