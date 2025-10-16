import { Prisma, User, UserRole } from "@prisma/client";

import { prisma } from "../../(helpers)/shared/prisma";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";

import { CreateQuestionPayload } from "./qna.interface";
import { qnaQueryValidationConfig, qnaSearchableFields } from "./qna.utils";

// ---------------------------------- CREATE QUESTION -------------------------------------
const createQuestion = async (user: User, data: CreateQuestionPayload) => {
  const result = await prisma.qnA.create({
    data: {
      ...data,
      inquirer_id: user.id,
    },
  });
  return result;
};

// ---------------------------------- GET QUESTION & ANSWERS ------------------------------
const getQnAs = async (query: Record<string, any>, user: User | null) => {
  const { search_term, page, limit, sort_by, sort_order, product_id } = query;

  if (sort_by) queryValidator(qnaQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(qnaQueryValidationConfig, "sort_order", sort_order);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.QnAWhereInput[] = [];

  if (search_term) {
    andConditions.push({
      OR: qnaSearchableFields.map((field) => {
        return {
          [field]: {
            contains: search_term,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (product_id) {
    andConditions.push({ product_id });
  }

  let approvalCondition: Prisma.QnAWhereInput = { is_approved: true };

  if (user && user.role === UserRole.CUSTOMER) {
    approvalCondition = {
      OR: [
        { is_approved: true },
        {
          AND: [{ is_approved: false }, { inquirer_id: user.id }],
        },
      ],
    };
  }

  const whereConditions = {
    AND: [...andConditions, approvalCondition],
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
    prisma.qnA.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy,
    }),
    await prisma.qnA.count({ where: whereConditions }),
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

// ---------------------------------- UPDATE QnA BY ADMIN ---------------------------------
const updateQnAByAdmin = (id: string, payload: Record<string, any>) => {
  const result = prisma.qnA.update({
    where: { id: id },
    data: payload,
  });
  return result;
};

// ---------------------------------- EDIT QUESTION BY CUSTOMER ---------------------------
const editQuestion = (id: string, payload: Record<string, any>, user: User) => {
  const result = prisma.qnA.update({
    where: { id: id, is_approved: false, inquirer_id: user.id },
    data: payload,
  });
  return result;
};

const deleteQnAs = async ({ ids }: { ids: string[] }) => {
  await prisma.qnA.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  return null;
};

export const QnAServices = {
  createQuestion,
  getQnAs,
  updateQnAByAdmin,
  deleteQnAs,
  editQuestion,
};
