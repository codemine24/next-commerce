import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const bannerSearchableFields = ["name", "title", "sub_title"];
export const bannerSortableFields = ["name", "type", "title", "sub_title"];

export const bannerQueryValidationConfig: Record<string, any> = {
  sort_by: bannerSortableFields,
  sort_order: SORT_ORDER_VALUE,
};
