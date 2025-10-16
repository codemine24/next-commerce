import { Prisma, ProductMetaType } from "@prisma/client";
import httpStatus from "http-status";

import { prisma } from "@/app/api/(helpers)/shared/prisma";

import CustomizedError from "../../(helpers)/error/customized-error";
import filterAdder from "../../(helpers)/utils/filter-adder";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import { parseBoolean } from "../../(helpers)/utils/parse-boolean";
import queryValidator from "../../(helpers)/utils/query-validator";
import { slugGenerator } from "../../(helpers)/utils/slug-generator";

import { ProductPayload } from "./product.interface";
import {
  productQueryValidationConfig,
  productSearchableFields,
} from "./product.utils";

// ------------------------------------ ADD PRODUCT --------------------------------------
const addProduct = async (payload: ProductPayload) => {
  const { categories, ...rest } = payload;
  const productCode = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");

  const product = await prisma.product.create({
    data: {
      ...rest,
      slug: slugGenerator(payload.name),
      product_code: productCode,
      ...(categories &&
        categories.length > 0 && {
          categories: {
            connect: categories.map((c) => ({
              id: c,
            })),
          },
        }),
    },
  });

  // Handle tags
  if (product && payload.tags && payload.tags.length > 0) {
    const normalizedTags = payload.tags.map((tag) => tag.toLowerCase());
    const existingMetas = await prisma.productMeta.findMany({
      where: {
        type: ProductMetaType.TAG,
        value: {
          in: normalizedTags,
        },
      },
    });
    const existingTags = new Set(existingMetas.map((meta) => meta.value));
    const missingTags = normalizedTags.filter((t) => !existingTags.has(t));
    if (missingTags.length > 0) {
      await prisma.productMeta.createMany({
        data: missingTags.map((tag) => ({
          type: ProductMetaType.TAG,
          value: tag,
        })),
        skipDuplicates: true,
      });
    }
  }

  return product;
};

// ------------------------------------ GET ALL PRODUCTS ---------------------------------
const getProducts = async (query: Record<string, any>) => {
  const {
    page,
    limit,
    sort_by,
    sort_order,
    search_term,
    price_range,
    is_banner_product,
    is_hot_deal,
    is_featured,
  } = query;

  console.log(query, "query");

  // Validate query parameters (sort_by, sort_order) if provided
  if (sort_by) queryValidator(productQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(productQueryValidationConfig, "sort_order", sort_order);

  // Generate pagination values: pageNumber, limitNumber, skip, sorting field and order
  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({ page, limit, sort_by, sort_order });

  // Initialize base filter: exclude deleted products
  const andConditions: Prisma.ProductWhereInput[] = [{ is_deleted: false }];

  // Apply search filter if search term is provided
  if (search_term) {
    const words = search_term
      .split(" ")
      .filter((word: string) => word.trim().length > 0);

    if (words.length) {
      andConditions.push({
        OR: words.flatMap((word: string) =>
          productSearchableFields.map((field) => ({
            [field]: {
              contains: word,
              mode: "insensitive",
            },
          }))
        ),
      });
    }
  }

  // Apply price range filter if provided
  if (price_range) {
    const [minPrice, maxPrice] = price_range.split(",").map(Number);
    if (!isNaN(minPrice)) filterAdder(andConditions, "price", "gte", minPrice);
    if (!isNaN(maxPrice)) filterAdder(andConditions, "price", "lte", maxPrice);
  }

  if (is_banner_product)
    filterAdder(
      andConditions,
      "is_banner_product",
      "equals",
      parseBoolean(is_banner_product)
    );
  if (is_hot_deal)
    filterAdder(
      andConditions,
      "is_hot_deal",
      "equals",
      parseBoolean(is_hot_deal)
    );
  if (is_featured)
    filterAdder(
      andConditions,
      "is_featured",
      "equals",
      parseBoolean(is_featured)
    );

  // Combine all AND conditions for Prisma query
  const whereConditions: Prisma.ProductWhereInput = { AND: andConditions };

  // Execute both findMany and count queries concurrently
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: whereConditions,
      skip,
      take: limitNumber,
      orderBy: { [sortWith]: sortSequence },
    }),
    prisma.product.count({ where: whereConditions }),
  ]);

  // Return paginated results
  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: products,
  };
};

// ------------------------------------ GET SINGLE PRODUCT -------------------------------
const getProduct = async (slug: string) => {
  const product = await prisma.product.findUniqueOrThrow({
    where: {
      slug,
    },
  });

  return product;
};

// ------------------------------------ UPDATE PRODUCT -----------------------------------
const updateProduct = async (slug: string, payload: ProductPayload) => {
  const { categories, ...rest } = payload;

  const product = await prisma.product.findUniqueOrThrow({
    where: {
      slug,
    },
  });

  if (payload.name) payload.slug = slugGenerator(payload.name);
  if (payload.is_banner_product && !product.is_banner_product) {
    const existingBannerProducts = await prisma.product.findMany({
      where: {
        is_banner_product: true,
      },
    });

    if (existingBannerProducts.length === 2) {
      throw new CustomizedError(
        httpStatus.BAD_REQUEST,
        "You can only have two banner products"
      );
    }
  }

  const result = await prisma.product.update({
    where: {
      slug,
    },

    data: {
      ...rest,
      ...(categories &&
        categories.length > 0 && {
          categories: {
            connect: categories.map((c) => ({
              id: c,
            })),
          },
        }),
    },
  });

  return result;
};

// ------------------------------------ DELETE PRODUCT -----------------------------------
const deleteProducts = async (payload: { ids: string[] }) => {
  const product = await prisma.product.deleteMany({
    where: {
      id: { in: payload.ids },
    },
  });

  return product;
};

export const ProductServices = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProducts,
};
