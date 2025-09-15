import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const reviewSortableFields = [
  "rating",
  "comment",
  "created_at",
  "updated_at",
];

export const reviewSelectedFields = {
  id: true,
  rating: true,
  comment: true,
  user: {
    select: {
      first_name: true,
      last_name: true,
      email: true,
      contact_number: true,
    },
  },
  product: {
    select: {
      name: true,
    },
  },
  created_at: true,
  updated_at: true,
};

export const reviewQueryValidationConfig: Record<string, any> = {
  sort_by: reviewSortableFields,
  sort_order: SORT_ORDER_VALUE,
};
