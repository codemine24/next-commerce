import { Prisma } from "@prisma/client";
import httpStatus from "http-status";

import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";

import {
  bannerQueryValidationConfig,
  bannerSearchableFields,
} from "./banner.utils";

// ------------------------------------ CREATE BANNER --------------------------------------
const createBanner = async (body: any) => {
  const result = await prisma.banner.create({
    data: body,
  });

  return result;
};

// ------------------------------------ GET BANNER'S ---------------------------------------
const getBanners = async (query: Record<string, any>) => {
  const {
    page,
    limit,
    sort_by = "name",
    sort_order,
    search_term,
    name,
  } = query;

  if (sort_by) queryValidator(bannerQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(bannerQueryValidationConfig, "sort_order", sort_order);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.BannerWhereInput[] = [];

  if (search_term) {
    andConditions.push({
      OR: bannerSearchableFields.map((field) => {
        return {
          [field]: {
            contains: search_term,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (name) {
    andConditions.push({
      name: {
        contains: name,
        mode: "insensitive",
      },
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.banner.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: { [sortWith]: sortSequence },
    }),
    await prisma.banner.count({ where: whereConditions }),
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

// ------------------------------------ UPDATE BANNER --------------------------------------
const updateBanner = async (id: string, data: Record<string, any>) => {
  await prisma.banner.findUniqueOrThrow({
    where: { id },
  });

  const result = await prisma.banner.update({
    where: { id },
    data: data,
  });

  return result;
};

// ------------------------------------ DELETE BANNER'S ------------------------------------
const deleteBanners = async ({ ids }: { ids: string[] }) => {
  // Step 1: Fetch banners that actually exist in the database
  const validBanners = await prisma.banner.findMany({
    where: {
      id: { in: ids },
    },
  });

  // Step 2: Throw an error if none of the provided IDs are valid
  if (validBanners.length === 0) {
    throw new CustomizedError(
      httpStatus.NOT_FOUND,
      "No valid banner id found to delete"
    );
  }

  const validIds = validBanners.map((banner) => banner.id);

  // Step 3: Delete banners themselves
  await prisma.banner.deleteMany({
    where: {
      id: { in: validIds },
    },
  });

  return null;
};

export const BannerServices = {
  createBanner,
  updateBanner,
  deleteBanners,
  getBanners,
};
