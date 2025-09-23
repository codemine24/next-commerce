import { ProductMetaType } from "@prisma/client";

export const productMetaQueryValidationConfig: Record<string, any> = {
  type: Object.values(ProductMetaType),
};
