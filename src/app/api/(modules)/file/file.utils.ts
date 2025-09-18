import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const allowedFileType = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/svg+xml",
  "image/vnd.microsoft.icon",
  "image/webp",
];

export const fileSearchableFields = ["name", "alt_text"];
export const fileSortableFields = ["name", "created_at", "updated_at", "size"];

export const fileQueryValidationConfig: Record<string, any> = {
  sort_by: fileSortableFields,
  sort_order: SORT_ORDER_VALUE,
  type: allowedFileType,
};

export const prepareTypes = (types: string) => {
  return types.split(",").map((type) => {
    switch (type) {
      case "svg":
        return "image/svg+xml";
      case "ico":
        return "image/vnd.microsoft.icon";
      default:
        return `image/${type}`;
    }
  });
};
