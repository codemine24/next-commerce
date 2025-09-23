import { Prisma } from "@prisma/client";

import { prisma } from "../../(helpers)/shared/prisma";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";

import { CourierPayload } from "./courier.interface";
import {
  courierQueryValidationConfig,
  courierSearchableFields,
} from "./courier.utils";

// ------------------------------------- CREATE COURIER ------------------------------------
const addCourier = async (data: CourierPayload) => {
  const result = await prisma.courier.create({
    data,
  });

  return result;
};

// ------------------------------------- GET COURIERS --------------------------------------
const getCouriers = async (query: Record<string, any>) => {
  const { search_term, page, limit, sort_by, sort_order } = query;

  if (sort_by) queryValidator(courierQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(courierQueryValidationConfig, "sort_order", sort_order);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.CourierWhereInput[] = [];

  if (search_term) {
    andConditions.push({
      OR: courierSearchableFields.map((field) => {
        return {
          [field]: {
            contains: search_term,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.courier.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
    }),
    prisma.courier.count({ where: whereConditions }),
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

// ------------------------------------- UPDATE COURIER ------------------------------------
const updateCourier = async (id: string, payload: Record<string, any>) => {
  const result = await prisma.courier.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

// ------------------------------------- DELETE COURIERS -----------------------------------
const deleteCouriers = async ({ ids }: { ids: string[] }) => {
  await prisma.courier.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  return null;
};

export const CourierServices = {
  addCourier,
  getCouriers,
  updateCourier,
  deleteCouriers,
};
