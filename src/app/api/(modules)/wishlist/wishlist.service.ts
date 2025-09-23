import { Prisma, User } from "@prisma/client";
import httpStatus from "http-status";

import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";

import { WishlistPayload } from "./wishlist.interface";
import { wishlistQueryValidationConfig } from "./wishlist.utils";

// ---------------------------------- ADD TO WISHLIST -----------------------------------
const addToWishlist = async (user: User, data: WishlistPayload) => {
  const result = await prisma.wishlist.create({
    data: {
      user_id: user.id,
      product_id: data.product_id,
    },
  });

  return result;
};

// ---------------------------------- GET WISHLIST --------------------------------------
const getWishlist = async (user: User, query: Record<string, any>) => {
  const { search_term, page, limit, sort_by, sort_order } = query;

  if (sort_by)
    queryValidator(wishlistQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(wishlistQueryValidationConfig, "sort_order", sort_order);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.WishlistWhereInput[] = [{ user_id: user.id }];

  if (search_term) {
    andConditions.push({
      product: {
        name: {
          contains: search_term,
          mode: "insensitive",
        },
      },
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const orderBy: Prisma.WishlistOrderByWithRelationInput =
    sortWith === "product_name"
      ? {
          product: {
            name: sortSequence,
          },
        }
      : sortWith === "product_price"
      ? {
          product: {
            price: sortSequence,
          },
        }
      : {
          [sortWith]: sortSequence,
        };

  const [result, total] = await Promise.all([
    prisma.wishlist.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy,
      include: {
        product: true,
      },
    }),
    await prisma.wishlist.count({ where: whereConditions }),
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

// ---------------------------------- REMOVE FROM WISHLIST ------------------------------
const removeFromWishlist = async (user: User, { ids }: { ids: string[] }) => {
  // Step 1: Fetch the wishlist rows that both match the IDs and belong to this user
  const existingWishlist = await prisma.wishlist.findMany({
    where: {
      product_id: { in: ids },
      user_id: user.id,
    },
  });

  // Step 2: Guard—no valid wishlist IDs found for this user
  if (existingWishlist.length === 0) {
    throw new CustomizedError(
      httpStatus.NOT_FOUND,
      "No valid wishlist id found to delete"
    );
  }

  // Step 3: Extract the IDs that truly belong to this user's wishlist
  const wishlistIds = existingWishlist.map((wishlist) => wishlist.product_id);

  // Step 4: Delete all matched wishlist rows in a single bulk operation
  await prisma.wishlist.deleteMany({
    where: {
      product_id: { in: wishlistIds },
    },
  });

  return null;
};

export const WishlistServices = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
