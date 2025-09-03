import { prisma } from "@/app/api/(helpers)/shared/prisma";
import { Prisma } from "@prisma/client";
import filterAdder from "../../(helpers)/utils/filter-adder";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";
import { slugGenerator } from "../../(helpers)/utils/slug-generator";
import { ProductPayload } from "./product.interface";
import {
  productQueryValidationConfig,
  productSearchableFields,
} from "./product.utils";

// ------------------------------------ ADD PRODUCT --------------------------------------
const addProduct = async (payload: ProductPayload) => {
  const productCode = "product-" + Math.random().toString(36).substring(2, 9);

  const product = await prisma.product.create({
    data: {
      ...payload,
      slug: slugGenerator(payload.name),
      product_code: productCode,
    },
  });

  return product;
};

// ------------------------------------ GET ALL PRODUCTS ---------------------------------
const getProducts = async (query: Record<string, any>) => {
  const { page, limit, sort_by, sort_order, search_term, price_range } = query;

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
  if (payload.name) payload.slug = slugGenerator(payload.name);
  const result = await prisma.product.update({
    where: {
      slug,
    },

    data: {
      ...payload,
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
