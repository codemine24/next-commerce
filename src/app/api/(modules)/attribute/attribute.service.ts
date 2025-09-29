import { Prisma } from "@prisma/client";
import httpStatus from "http-status";

import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";

import { AttributePayload, AttributeValue } from "./attribute.interface";
import {
  attributeQueryValidationConfig,
  attributeSearchableFields,
} from "./attribute.utils";

// ------------------------------------ CREATE ATTRIBUTE --------------------------------------
const createAttribute = async (data: AttributePayload) => {
  const { name, type, category_id, attribute_values } = data;

  if (category_id) {
    const category = await prisma.category.findUnique({
      where: {
        id: category_id,
      },
    });
    if (!category) {
      throw new CustomizedError(httpStatus.NOT_FOUND, "Category not found");
    }
  }

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

// ------------------------------------ UPDATE ATTRIBUTE --------------------------------------
const updateAttribute = async (id: string, payload: Record<string, any>) => {
  const { name, type, category_id, status, attribute_values } = payload;

  // Step 1: Fetch the existing attribute (only the fields we need).
  const attribute = await prisma.productAttribute.findUnique({
    where: { id },
    select: { id: true, category_id: true },
  });

  if (!attribute) {
    throw new CustomizedError(httpStatus.NOT_FOUND, "Attribute not found");
  }

  // Step 2: If category_id is provided and different from current -> validate category exists.
  if (category_id !== undefined && category_id !== attribute.category_id) {
    const category = await prisma.category.findUnique({
      where: { id: category_id },
      select: { id: true },
    });
    if (!category) {
      throw new CustomizedError(httpStatus.NOT_FOUND, "Category not found");
    }
  }

  // Step 3: Build the update payload only with provided fields so we don't overwrite with undefined.
  const updateData: Record<string, any> = {};
  if (name) updateData.name = name;
  if (type) updateData.type = type;
  if (category_id) updateData.category_id = category_id;
  if (status) updateData.status = status;

  // Step 4: Use a single transaction to perform the update.
  const result = await prisma.$transaction(async (tx) => {
    if (attribute_values && attribute_values.length > 0) {
      await tx.attributeValue.deleteMany({ where: { attribute_id: id } });
      await tx.attributeValue.createMany({
        data: attribute_values.map((item: AttributeValue) => ({
          title: item.title,
          position: item.position || 0,
          attribute_id: id,
        })),
      });
    }

    const updatedAttribute = await tx.productAttribute.update({
      where: { id },
      data: updateData,
      include: { attribute_values: true },
    });

    return updatedAttribute;
  });

  return result;
};

export const AttributeServices = {
  createAttribute,
  getAttributes,
  deleteAttributes,
  updateAttribute,
};
