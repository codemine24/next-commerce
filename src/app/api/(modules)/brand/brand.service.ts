import { Prisma } from "@prisma/client";
import { prisma } from "../../(helpers)/shared/prisma";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";
import { slugGenerator } from "../../(helpers)/utils/slug-generator";
import { BrandPayload } from "./brand.interface";
import {
  brandQueryValidationConfig,
  brandSearchableFields,
} from "./brand.utils";

// ------------------------------------ ADD BRAND --------------------------------------
const addBrand = async (payload: BrandPayload) => {
  const brand = {
    slug: slugGenerator(payload.name),
    ...payload,
  };

  const result = await prisma.brand.create({
    data: brand,
  });

  return result;
};

// ------------------------------------ GET BRANDS -------------------------------------
const getBrands = async (query: Record<string, any>) => {
  const { page, limit, sort_by, sort_order, search_term, featured } = query;

  if (sort_by) queryValidator(brandQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(brandQueryValidationConfig, "sort_order", sort_order);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.BrandWhereInput[] = [];

  if (search_term) {
    andConditions.push({
      OR: brandSearchableFields.map((field) => {
        return {
          [field]: {
            contains: search_term,
            mode: "insensitive",
          },
        };
      }),
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

  const orderBy: Prisma.BrandOrderByWithRelationInput =
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
    prisma.brand.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy,
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    }),
    await prisma.brand.count({ where: whereConditions }),
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

// ------------------------------------ GET SINGLE BRAND -------------------------------
const getBrand = async (id: string) => {
  const result = await prisma.brand.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};

// ------------------------------------ UPDATE BRAND -----------------------------------
const updateBrand = async (id: string, payload: BrandPayload) => {
  const result = await prisma.brand.update({
    where: {
      id,
    },
    data: {
      ...payload,
      ...(payload.name && { slug: slugGenerator(payload.name) }),
    },
  });
  return result;
};

// ------------------------------------ DELETE BRANDS ----------------------------------
const deleteBrands = async ({ ids }: { ids: string[] }) => {
  await prisma.brand.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  return null;
};

export const BrandServices = {
  addBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrands,
};
