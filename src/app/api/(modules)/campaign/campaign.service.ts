import { Prisma } from "@prisma/client";
import httpStatus from "http-status";

import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";
import { slugGenerator } from "../../(helpers)/utils/slug-generator";
import {
  brandSelectFieldsWithProduct,
  categorySelectFieldsWithProduct,
  productQueryValidationConfig,
  productSearchableFields,
} from "../product/product.utils";

import { CampaignPayload } from "./campaign.interface";
import {
  campaignQueryValidationConfig,
  campaignSearchableFields,
  getCampaignStatus,
} from "./campaign.utils";

// ---------------------------------- CREATE CAMPAIGN ----------------------------------
const createCampaign = async (data: CampaignPayload) => {
  // Step 1: Destructure payload to separate relational fields and campaign timings
  const {
    eligible_brands,
    eligible_categories,
    eligible_products,
    start_at,
    end_at,
    ...remainingData
  } = data;

  // Step 2: Convert input dates into proper Date objects
  const startDate = new Date(start_at);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(end_at);
  endDate.setHours(23, 59, 59, 999);

  // Step 3: Determine campaign status based on start & end dates
  const status = getCampaignStatus(startDate, endDate);

  // Step 4: Generate a URL-friendly slug from campaign title
  const slug = slugGenerator(data.title);

  // Step 5: Prepare relational connection data (only if provided & non-empty)
  const connectRelations = {
    ...(eligible_products?.length && {
      eligible_products: { connect: eligible_products.map((id) => ({ id })) },
    }),
    ...(eligible_brands?.length && {
      eligible_brands: { connect: eligible_brands.map((id) => ({ id })) },
    }),
    ...(eligible_categories?.length && {
      eligible_categories: {
        connect: eligible_categories.map((id) => ({ id })),
      },
    }),
  };

  // Step 6: Insert campaign into DB using Prisma
  const result = await prisma.campaign.create({
    data: {
      ...remainingData,
      start_at: startDate,
      end_at: endDate,
      status,
      slug,
      ...connectRelations,
    },
  });

  return result;
};

// ---------------------------------- GET CAMPAIGNS ------------------------------------
const getCampaigns = async (query: Record<string, any>) => {
  // Step 1: Destructure query parameters
  const {
    searchTerm,
    page,
    limit,
    sort_by,
    sort_order,
    start_at,
    end_at,
    ...remainingQuery
  } = query;

  // Step 2: Validate sorting parameters if provided
  if (sort_by) {
    queryValidator(campaignQueryValidationConfig, "sort_by", sort_by);
  }
  if (sort_order) {
    queryValidator(campaignQueryValidationConfig, "sort_order", sort_order);
  }

  // Step 3: Setup pagination and sorting configuration
  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  // Step 4: Initialize an array to hold AND conditions
  const andConditions: Prisma.CampaignWhereInput[] = [];

  // Step 5: Add search condition if searchTerm is provided
  if (searchTerm) {
    andConditions.push({
      OR: campaignSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // Step 6: Add date filters if provided
  if (start_at) {
    andConditions.push({ start_at: { gte: new Date(start_at) } });
  }
  if (end_at) {
    andConditions.push({ end_at: { lte: new Date(end_at) } });
  }

  // Step 7: Add other filters dynamically from remaining query
  if (Object.keys(remainingQuery).length) {
    for (const [key, value] of Object.entries(remainingQuery)) {
      // Validate field against whitelist config
      queryValidator(campaignQueryValidationConfig, key, value);

      // Normalize boolean-like strings into actual booleans
      const normalizedValue =
        value === "true" ? true : value === "false" ? false : value;

      andConditions.push({ [key]: normalizedValue });
    }
  }

  // Step 8: Build final where condition object
  const whereConditions: Prisma.CampaignWhereInput = {
    AND: andConditions,
  };

  // Step 9: Fetch campaigns and total count in parallel
  const [result, total] = await Promise.all([
    prisma.campaign.findMany({
      where: whereConditions,
      skip,
      take: limitNumber,
      orderBy: { [sortWith]: sortSequence },
      include: {
        eligible_brands: {
          select: {
            id: true,
            slug: true,
            name: true,
            icon: true,
          },
        },
        eligible_categories: {
          select: {
            id: true,
            slug: true,
            title: true,
            icon: true,
          },
        },
        eligible_products: {
          select: {
            id: true,
            slug: true,
            name: true,
            thumbnail: true,
          },
        },
      },
    }),
    prisma.campaign.count({ where: whereConditions }),
  ]);

  // Step 10: Return paginated response with meta info
  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

// ---------------------------------- UPDATE CAMPAIGN ----------------------------------
const updateCampaign = async (id: string, payload: Record<string, any>) => {
  // Step 1: Destructure relational fields & dates from payload
  const {
    eligible_brands,
    eligible_categories,
    eligible_products,
    start_at,
    end_at,
    ...remainingData
  } = payload;

  // Step 2: Ensure campaign exists (throws if not found)
  const campaign = await prisma.campaign.findUniqueOrThrow({
    where: { id },
    include: {
      eligible_brands: {
        select: {
          id: true,
        },
      },
      eligible_categories: {
        select: {
          id: true,
        },
      },
      eligible_products: {
        select: {
          id: true,
        },
      },
    },
  });

  // Step 3: Normalize start and end date (from payload if given, otherwise keep existing)
  const startDate = start_at ? new Date(start_at) : new Date(campaign.start_at);
  startDate.setHours(0, 0, 0, 0); // start of the day
  const endDate = end_at ? new Date(end_at) : new Date(campaign.end_at);
  endDate.setHours(23, 59, 59, 999); // end of the day

  // Step 4: Recalculate campaign status based on updated dates
  const status = getCampaignStatus(startDate, endDate);

  // Step 5: Regenerate slug if title is updated & changed
  if (remainingData.title && remainingData.title !== campaign.title) {
    remainingData.slug = slugGenerator(remainingData.title);
  }

  // Step 6: Prepare relational connections only if provided AND changed
  const connectRelations: Record<string, any> = {};

  // Helper function to check if arrays are different
  const hasChanged = (existing: { id: string }[], incoming?: string[]) => {
    if (!incoming) return false; // nothing provided
    if (existing.length !== incoming.length) return true;
    const existingIds = existing.map((e) => e.id).sort();
    const incomingIds = [...incoming].sort();
    return JSON.stringify(existingIds) !== JSON.stringify(incomingIds);
  };

  if (hasChanged(campaign.eligible_products, eligible_products)) {
    connectRelations.eligible_products = {
      set: eligible_products.map((id: string) => ({ id })), // overwrite old with new
    };
  }

  if (hasChanged(campaign.eligible_brands, eligible_brands)) {
    connectRelations.eligible_brands = {
      set: eligible_brands.map((id: string) => ({ id })),
    };
  }

  if (hasChanged(campaign.eligible_categories, eligible_categories)) {
    connectRelations.eligible_categories = {
      set: eligible_categories.map((id: string) => ({ id })),
    };
  }

  // Step 7: Update campaign record in database
  const result = await prisma.campaign.update({
    where: { id },
    data: {
      ...remainingData,
      start_at: startDate,
      end_at: endDate,
      status,
      ...connectRelations,
    },
  });

  return result;
};

// ---------------------------------- DELETE CAMPAIGNS ---------------------------------
const deleteCampaigns = async ({ ids }: { ids: string[] }) => {
  // Step 1: Fetch campaigns that actually exist in the database
  const validCampaigns = await prisma.campaign.findMany({
    where: {
      id: { in: ids },
    },
  });

  // Step 2: Throw an error if none of the provided IDs are valid
  if (validCampaigns.length === 0) {
    throw new CustomizedError(
      httpStatus.NOT_FOUND,
      "No valid campaign id found to delete"
    );
  }

  const validIds = validCampaigns.map((campaign) => campaign.id);

  // Step 3: Delete campaigns themselves
  await prisma.campaign.deleteMany({
    where: {
      id: { in: validIds },
    },
  });

  return null;
};

const getProductsForCampaign = async (query: Record<string, any>) => {
  const {
    search_term,
    page,
    limit,
    sort_by,
    sort_order,
    brand_id,
    category_id,
    product_id,
  } = query;

  if (sort_by) queryValidator(productQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(productQueryValidationConfig, "sort_order", sort_order);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.ProductWhereInput[] = [
    {
      is_deleted: false,
    },
  ];

  if (search_term) {
    const words: string[] = search_term
      .split(" ")
      .filter((word: string) => word.length > 0);

    andConditions.push({
      OR: words.flatMap((word: string) => [
        ...productSearchableFields.map((field) => ({
          [field]: {
            contains: word,
            mode: "insensitive",
          },
        })),
      ]),
    });
  }

  if (category_id) {
    const categoryIds = category_id.split(",");
    andConditions.push({
      categories: {
        some: {
          id: {
            in: categoryIds,
          },
        },
      },
    });
  }

  if (brand_id) {
    const brandIds = brand_id.split(",");
    andConditions.push({
      brand_id: {
        in: brandIds,
      },
    });
  }

  if (product_id) {
    const productIds = product_id.split(",");
    andConditions.push({
      id: {
        in: productIds,
      },
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.product.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
      include: {
        brand: {
          select: {
            ...brandSelectFieldsWithProduct,
          },
        },
        categories: {
          select: {
            ...categorySelectFieldsWithProduct,
          },
        },
        attributes: {
          select: {
            title: true,
            // value: true,
          },
        },
      },
    }),
    prisma.product.count({ where: whereConditions }),
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

const getCampaignDetails = async (id: string, query: Record<string, any>) => {
  // 1. Fetch campaign with eligible brands, categories, and products
  const campaign = await prisma.campaign.findUniqueOrThrow({
    where: { id },
    include: {
      eligible_brands: {
        select: { id: true, slug: true, name: true, icon: true },
      },
      eligible_categories: {
        select: { id: true, slug: true, title: true, icon: true },
      },
      eligible_products: {
        select: { id: true, slug: true, name: true, thumbnail: true },
      },
    },
  });

  if (query?.products) {
    // 2. Fetch eligible products
    const products = await getProductsForCampaign({
      ...query,
      product_id:
        campaign.eligible_products.length > 0
          ? campaign.eligible_products.map((p) => p.id).join(",")
          : undefined,
      brand_id:
        campaign.eligible_brands.length > 0
          ? campaign.eligible_brands.map((b) => b.id).join(",")
          : undefined,
      category_id:
        campaign.eligible_categories.length > 0
          ? campaign.eligible_categories.map((c) => c.id).join(",")
          : undefined,
    });

    // 3. Exclude eligible_brands, eligible_categories and eligible_products from campaign
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      eligible_brands,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      eligible_categories,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      eligible_products,
      ...remainingCampaign
    } = campaign;

    // 4. Return campaign + products with pagination meta
    return {
      meta: products.meta,
      data: {
        ...remainingCampaign,
        products: products.data,
      },
    };
  }

  return campaign;
};

export const CampaignServices = {
  createCampaign,
  getCampaigns,
  updateCampaign,
  deleteCampaigns,
  getCampaignDetails,
};
