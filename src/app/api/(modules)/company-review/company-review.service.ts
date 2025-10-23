import { Prisma } from "@prisma/client";
import httpStatus from "http-status";

import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";

import { CompanyReviewPayload } from "./company-review.interface";
import { companyReviewQueryValidationConfig } from "./company-review.utils";

// ---------------------------------------- ADD COMPANY REVIEW ------------------------------------
const createCompanyReview = async (data: CompanyReviewPayload) => {
  const result = await prisma.companyReview.create({
    data: {
      ...data,
    },
  });

  return result;
};

// ---------------------------------------- GET COMPANY REVIEWS -----------------------------------
const getCompanyReviews = async (query: Record<string, any>) => {
  const { page, limit, sort_by, sort_order } = query;

  if (sort_by)
    queryValidator(companyReviewQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(
      companyReviewQueryValidationConfig,
      "sort_order",
      sort_order
    );

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.CompanyReviewWhereInput[] = [];

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.companyReview.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
    }),
    prisma.companyReview.count({ where: whereConditions }),
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

// ---------------------------------------- UPDATE COMPANY REVIEW ---------------------------------
const updateCompanyReview = async (
  id: string,
  payload: Record<string, any>
) => {
  await prisma.companyReview.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.companyReview.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

// ---------------------------------------- DELETE COMPANY REVIEWS --------------------------------
const deleteCompanyReviews = async ({ ids }: { ids: string[] }) => {
  // Step 1: Fetch company reviews that actually exist in the database
  const validReviews = await prisma.companyReview.findMany({
    where: {
      id: { in: ids },
    },
  });

  // Step 2: Throw an error if none of the provided IDs are valid
  if (validReviews.length === 0) {
    throw new CustomizedError(
      httpStatus.NOT_FOUND,
      "No valid review id found to delete"
    );
  }

  const validIds = validReviews.map((review) => review.id);

  // Step 3: Delete blogs themselves
  await prisma.companyReview.deleteMany({
    where: {
      id: { in: validIds },
    },
  });

  return null;
};

export const CompanyReviewServices = {
  createCompanyReview,
  getCompanyReviews,
  updateCompanyReview,
  deleteCompanyReviews,
};
