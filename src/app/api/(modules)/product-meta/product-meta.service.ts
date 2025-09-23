import { Prisma } from "@prisma/client";

import { prisma } from "../../(helpers)/shared/prisma";
import queryValidator from "../../(helpers)/utils/query-validator";

import { productMetaQueryValidationConfig } from "./product-meta.utils";

const getProductMeta = async (query: Record<string, any>) => {
  const { type } = query;

  const andConditions: Prisma.ProductMetaWhereInput[] = [];

  if (type) {
    queryValidator(productMetaQueryValidationConfig, "type", type);
    andConditions.push({
      type: {
        in: type.split(","),
      },
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const result = await prisma.productMeta.findMany({
    where: whereConditions,
    orderBy: {
      value: "asc",
    },
  });

  return result;
};

export const ProductMetaServices = {
  getProductMeta,
};
