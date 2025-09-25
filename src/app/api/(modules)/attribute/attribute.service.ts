import { prisma } from "../../(helpers)/shared/prisma";

import { AttributePayload } from "./attribute.interface";

// ------------------------------------ CREATE ATTRIBUTE --------------------------------------
const createAttribute = async (data: AttributePayload) => {
  const { name, type, attribute_values } = data;
  const result = await prisma.productAttribute.create({
    data: {
      name,
      type,
      attribute_values: {
        create: attribute_values,
      },
    },
    include: {
      attribute_values: true,
    },
  });

  return result;
};

export const AttributeServices = { createAttribute };
