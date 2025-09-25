import { Prisma } from "@prisma/client";
import httpStatus from "http-status";

import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";

import { AttributePayload } from "./attribute.interface";
import {
  attributeQueryValidationConfig,
  attributeSearchableFields,
} from "./attribute.utils";

// ------------------------------------ CREATE ATTRIBUTE --------------------------------------
const createAttribute = async (data: AttributePayload) => {
  const { name, type, category_id, attribute_values } = data;
  const result = await prisma.productAttribute.create({
    data: {
      name,
      type,
      category_id,
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

// ------------------------------------ GET ATTRIBUTES ----------------------------------------
const getAttributes = async (query: Record<string, any>) => {
  const {
    page,
    limit,
    sort_by = "name",
    sort_order,
    search_term,
    category,
  } = query;

  if (sort_by)
    queryValidator(attributeQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(attributeQueryValidationConfig, "sort_order", sort_order);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.ProductAttributeWhereInput[] = [];

  if (search_term) {
    andConditions.push({
      OR: attributeSearchableFields.map((field) => {
        return {
          [field]: {
            contains: search_term,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (category) {
    andConditions.push({
      OR: [
        {
          category_id: category,
        },
        {
          category: {
            title: {
              equals: category,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.productAttribute.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: { [sortWith]: sortSequence },
      include: {
        attribute_values: true,
      },
    }),
    await prisma.productAttribute.count({ where: whereConditions }),
  ]);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

// ------------------------------------ DELETE ATTRIBUTES -------------------------------------
const deleteAttributes = async ({ ids }: { ids: string[] }) => {
  // Step 1: Fetch attributes that actually exist in the database
  const validAttributes = await prisma.productAttribute.findMany({
    where: {
      id: { in: ids },
    },
  });

  // Step 2: Throw an error if none of the provided IDs are valid
  if (validAttributes.length === 0) {
    throw new CustomizedError(
      httpStatus.NOT_FOUND,
      "No valid attribute id found to delete"
    );
  }

  const validIds = validAttributes.map((attribute) => attribute.id);

  // Step 3: Delete attributes themselves
  await prisma.productAttribute.deleteMany({
    where: {
      id: { in: validIds },
    },
  });

  return null;
};

export const AttributeServices = {
  createAttribute,
  getAttributes,
  deleteAttributes,
};
