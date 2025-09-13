import { Prisma } from "@prisma/client";
import httpStatus from "http-status";

import { CategoryPayload } from "./category.interface";
import {
  categoryQueryValidationConfig,
  categorySearchableFields,
} from "./category.utils";
import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";
import { slugGenerator } from "../../(helpers)/utils/slug-generator";

// ------------------------------------ ADD CATEGORY -------------------------------------
const addCategory = async (payload: CategoryPayload) => {
  let parent_category = null;
  if (payload.parent_id) {
    parent_category = await prisma.category.findFirst({
      where: {
        id: payload.parent_id,
      },
    });
    if (!parent_category)
      throw new CustomizedError(
        httpStatus.NOT_FOUND,
        "Parent category not found"
      );
  }
  const category = {
    ...payload,
    slug: slugGenerator(
      parent_category
        ? `${payload.title}-${parent_category.slug}`
        : payload.title
    ),
  };

  const result = await prisma.category.create({
    data: {
      ...category,
    },
  });

  return result;
};

// ------------------------------------ GET CATEGORIES -----------------------------------
const getCategories = async (query: Record<string, any>) => {
  const { page, limit, sort_by, sort_order, search_term, featured, parent } =
    query;

  if (sort_by)
    queryValidator(categoryQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(categoryQueryValidationConfig, "sort_order", sort_order);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.CategoryWhereInput[] = [];

  if (search_term) {
    andConditions.push({
      OR: categorySearchableFields.map((field) => {
        return {
          [field]: {
            contains: search_term,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (parent) {
    andConditions.push({
      parent: {
        title: {
          equals: parent,
          mode: "insensitive",
        },
      },
    });
  }

  if (featured) {
    andConditions.push({
      featured: featured === "true",
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const orderBy: Prisma.CategoryOrderByWithRelationInput =
    sortWith === "products"
      ? {
          products: {
            _count: sortSequence,
          },
        }
      : {
          [sortWith]: sortSequence,
        };

  const [result, total] = await Promise.all([
    prisma.category.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy,
      include: {
        parent: {
          select: {
            id: true,
            title: true,
            slug: true,
            icon: true,
            description: true,
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
    }),
    prisma.category.count({ where: whereConditions }),
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

// ------------------------------------ GET SINGLE CATEGORY ------------------------------
const getCategory = async (id: string) => {
  const result = await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      parent: true,
    },
  });
  return result;
};

// ------------------------------------ UPDATE CATEGORY ----------------------------------
const updateCategory = async (id: string, payload: CategoryPayload) => {
  let parent_category = null;
  if (payload.parent_id) {
    parent_category = await prisma.category.findFirst({
      where: {
        id: payload.parent_id,
      },
    });
    if (!parent_category) {
      throw new CustomizedError(
        httpStatus.NOT_FOUND,
        "Parent category not found"
      );
    }
  }

  const category = {
    ...payload,
    ...(payload.title && {
      slug: slugGenerator(
        parent_category
          ? `${payload.title}-${parent_category.slug}`
          : payload.title
      ),
    }),
  };

  const result = await prisma.category.update({
    where: {
      id,
    },
    data: {
      ...category,
    },
    include: {
      parent: true,
    },
  });
  return result;
};

// ------------------------------------ DELETE CATEGORIES --------------------------------
const deleteCategory = async ({ ids }: { ids: string[] }) => {
  const result = await prisma.category.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  if (result.count === 0) {
    throw new Error("No valid category id found to delete");
  }
  return null;
};

export const CategoryServices = {
  addCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
};
