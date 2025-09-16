import { Prisma, User } from "@prisma/client";
import httpStatus from "http-status";

import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";

import { CreateReviewPayload } from "./review.interface";
import {
  reviewQueryValidationConfig,
  reviewSelectedFields,
} from "./review.utils";

// ---------------------------------------- ADD REVIEW ---------------------------------------
const createReview = async (user: User, payload: CreateReviewPayload) => {
  const product = await prisma.product.findUnique({
    where: {
      id: payload.product_id,
      is_deleted: false,
    },
    select: {
      id: true,
    },
  });

  if (!product) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "The product does not exist"
    );
  }

  const result = await prisma.review.create({
    data: {
      user_id: user.id,
      ...payload,
    },
  });
  return result;
};

// ---------------------------------------- GET REVIEWS --------------------------------------
const getReviewsByProductId = async (
  product_id: string,
  query: Record<string, any>
) => {
  const { page, limit, sort_by, sort_order } = query;

  if (sort_by) queryValidator(reviewQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(reviewQueryValidationConfig, "sort_order", sort_order);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.ReviewWhereInput[] = [{ product_id: product_id }];

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.review.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
      select: {
        ...reviewSelectedFields,
      },
    }),
    prisma.review.count({ where: whereConditions }),
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

// ---------------------------------------- UPDATE REVIEW ------------------------------------
const updateReview = async (
  id: string,
  user: User,
  payload: Record<string, any>
) => {
  const result = await prisma.review.update({
    where: {
      id,
      user_id: user.id,
    },
    data: payload,
  });
  return result;
};

export const ReviewServices = {
  createReview,
  getReviewsByProductId,
  updateReview,
};
