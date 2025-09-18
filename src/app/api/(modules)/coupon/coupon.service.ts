import {
  BeneficiaryType,
  DiscountType,
  OrderStatus,
  Prisma,
} from "@prisma/client";
import httpStatus from "http-status";

import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import { dateChecker } from "../../(helpers)/utils/date-checker";
import filterAdder from "../../(helpers)/utils/filter-adder";
import { convertConnectingData } from "../../(helpers)/utils/helper";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";

import {
  ApplyCouponPayload,
  ApplyCouponResponse,
  CouponPayload,
} from "./coupon.interface";
import {
  couponQueryValidationConfig,
  couponSearchableFields,
} from "./coupon.utils";

// ------------------------------------- CREATE COUPON ------------------------------------
const createCoupon = async (payload: CouponPayload) => {
  const {
    start_date,
    expiration_date,
    eligible_brands,
    eligible_categories,
    eligible_products,
    ...remainingField
  } = payload;

  // Step 1: Convert string dates to JavaScript Date objects
  const modified_start_date = start_date
    ? dateChecker(start_date, "start_date")
    : new Date();
  const modified_expiration_date = dateChecker(
    expiration_date,
    "expiration_date"
  );

  // Step 2: Validate that start date is not after expiration date
  if (modified_start_date > modified_expiration_date) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "Start date cannot be greater than expiration date"
    );
  }

  // Step 3: Prepare connection data for eligible categories, brands and products (if provided)
  const eligibleCategoriesData = eligible_categories?.length
    ? { connect: convertConnectingData(eligible_categories) }
    : undefined;
  const eligibleBrandsData = eligible_brands?.length
    ? { connect: convertConnectingData(eligible_brands) }
    : undefined;
  const eligibleProductsData = eligible_products?.length
    ? { connect: convertConnectingData(eligible_products) }
    : undefined;

  // Step 4: Create the coupon in the database
  const result = await prisma.coupon.create({
    data: {
      ...remainingField,
      start_date: modified_start_date,
      expiration_date: modified_expiration_date,
      eligible_categories: eligibleCategoriesData,
      eligible_brands: eligibleBrandsData,
      eligible_products: eligibleProductsData,
    },
  });

  return result;
};

// ------------------------------------- GET COUPONS --------------------------------------
const getCoupons = async (query: Record<string, any>) => {
  const {
    search_term,
    page,
    limit,
    sort_by,
    sort_order,
    min_value,
    max_value,
    ...remainingQuery
  } = query;

  // Step 1: Validate sorting fields if provided
  if (sort_by) queryValidator(couponQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(couponQueryValidationConfig, "sort_order", sort_order);

  // Step 2: Generate pagination and sorting details
  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  // Step 3: Initialize AND conditions for Prisma where query
  const andConditions: Prisma.CouponWhereInput[] = [];

  // Step 4: Apply search filter across multiple fields if search_term exists
  if (search_term) {
    andConditions.push({
      OR: couponSearchableFields.map((field) => {
        return {
          [field]: {
            contains: search_term,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  // Step 5: Apply remaining query filters (like boolean or other fields)
  if (Object.keys(remainingQuery).length) {
    for (const [key, value] of Object.entries(remainingQuery)) {
      queryValidator(couponQueryValidationConfig, key, value);
      andConditions.push({
        [key]: value === "true" ? true : value === "false" ? false : value,
      });
    }
  }

  // Step 6: Apply numeric range filters for discount value
  filterAdder(andConditions, "discount_value", "gte", Number(min_value));
  filterAdder(andConditions, "discount_value", "lte", Number(max_value));

  // Step 7: Combine all AND conditions into a single where object
  const whereConditions = {
    AND: andConditions,
  };

  // Step 8: Fetch data and total count in parallel
  const [result, total] = await Promise.all([
    prisma.coupon.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
      include: {
        eligible_categories: {
          select: {
            id: true,
            title: true,
            icon: true,
          },
        },
        eligible_brands: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
        eligible_products: {
          select: {
            id: true,
            name: true,
            thumbnail: true,
          },
        },
      },
    }),
    prisma.coupon.count({ where: whereConditions }),
  ]);

  // Step 9: Return paginated data and metadata
  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

// ------------------------------------- UPDATE COUPONS -----------------------------------
const updateCoupon = async (id: string, payload: Record<string, any>) => {
  const {
    eligible_brands,
    eligible_categories,
    eligible_products,
    start_date,
    expiration_date,
    ...remainingData
  } = payload;

  // 1. Find the existing coupon by ID
  const coupon = await prisma.coupon.findUniqueOrThrow({
    where: { id },
  });

  // 2. Convert string dates to valid JavaScript Date objects
  const modified_start_date = start_date
    ? dateChecker(start_date, "start_date")
    : coupon.start_date;
  const modified_expiration_date = expiration_date
    ? dateChecker(expiration_date, "expiration_date")
    : coupon.expiration_date;

  // 3. Validate that start_date is not greater than expiration_date
  if (modified_start_date > modified_expiration_date) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "Start date cannot be greater than expiration date"
    );
  }

  // 4. Update coupon with new data and connect eligible entities
  const result = await prisma.coupon.update({
    where: { id },
    data: {
      start_date: modified_start_date,
      expiration_date: modified_expiration_date,
      ...remainingData,
      ...(eligible_categories && {
        categories: { connect: convertConnectingData(eligible_categories) },
      }),
      ...(eligible_brands && {
        brands: { connect: convertConnectingData(eligible_brands) }, // ✅ fixed relation
      }),
      ...(eligible_products && {
        products: { connect: convertConnectingData(eligible_products) }, // ✅ fixed relation
      }),
    },
  });

  return result;
};

// ------------------------------------- UPDATE ACTIVE STATUS -----------------------------
const updateCouponActiveStatus = async () => {
  const now = new Date();

  // Deactivate expired coupons
  const updateExpiredCoupons = await prisma.coupon.updateMany({
    where: {
      is_active: true,
      OR: [
        {
          start_date: {
            gt: now,
          },
        },
        {
          expiration_date: {
            lt: now,
          },
        },
      ],
    },
    data: {
      is_active: false,
    },
  });
  console.log(`${updateExpiredCoupons.count} expired coupons deactivated`);

  // Activate coupons that are within the start and expiration date range
  const updateDiactiveCoupons = await prisma.coupon.updateMany({
    where: {
      is_active: false,
      start_date: {
        lte: now,
      },
      expiration_date: {
        gte: now,
      },
    },
    data: {
      is_active: true,
    },
  });
  console.log(`${updateDiactiveCoupons.count} diactive coupons activated`);
};

// ------------------------------------- APPLY COUPON -------------------------------------
const applyCoupon = async (
  payload: ApplyCouponPayload
): Promise<ApplyCouponResponse> => {
  const { code, email, order_amount, user } = payload;
  const coupon = await prisma.coupon.findUnique({
    where: {
      code,
    },
  });

  // Check if the coupon exists
  if (!coupon || !coupon.is_active) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "Invalid or inactive coupon"
    );
  }

  let customer_type: "NEW" | "EXISTING" | "GUEST" = "GUEST";

  if (email) {
    let userInfo:
      | { id: string; _count: { orders: number } }
      | undefined
      | null = user;
    if (!userInfo) {
      userInfo = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          _count: {
            select: {
              orders: true,
            },
          },
        },
      });
    }

    if (userInfo) {
      customer_type = userInfo._count.orders > 1 ? "EXISTING" : "NEW";

      // Check if the per user limit has been reached
      if (coupon.per_user_limit) {
        const orderCount = await prisma.order.count({
          where: {
            user_id: userInfo.id,
            coupon_id: coupon.id,
            order_status: {
              notIn: [OrderStatus.CANCELLED, OrderStatus.REFUNDED],
            },
          },
        });

        if (orderCount >= coupon.per_user_limit) {
          throw new CustomizedError(
            httpStatus.BAD_REQUEST,
            "You have already used this coupon the maximum allowed times"
          );
        }
      }
    }
  }

  // Check if the coupon is valid for this user
  if (
    coupon.beneficiary_type === BeneficiaryType.NEW_USER &&
    customer_type !== "NEW"
  ) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "Register or login first to use this coupon"
    );
  }

  if (
    coupon.beneficiary_type === BeneficiaryType.EXISTING_USER &&
    customer_type === "GUEST"
  ) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "Register or login first to use this coupon"
    );
  }

  // Check if the coupon is valid for this time period
  if (
    coupon.start_date.toISOString() > new Date().toISOString() ||
    coupon.expiration_date.toISOString() < new Date().toISOString()
  ) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "Coupon is not valid for this time period"
    );
  }

  // Check if the coupon usage limit has been reached
  if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "Coupon usage limit exceeded"
    );
  }

  // Check if the order amount meet the minimum requirements
  if (coupon.min_order_amount && order_amount < coupon.min_order_amount) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      `To apply this coupon, the order amount must be at least ${coupon.min_order_amount}`
    );
  }

  let discount_amount = 0;

  if (coupon.discount_type === DiscountType.AMOUNT) {
    discount_amount = Math.min(
      coupon.discount_value,
      coupon.maximum_value || coupon.discount_value
    );
  } else if (coupon.discount_type === DiscountType.PERCENTAGE) {
    discount_amount = Math.min(
      order_amount * (coupon.discount_value / 100),
      coupon.maximum_value || order_amount * (coupon.discount_value / 100)
    );
  }

  return {
    id: coupon.id,
    code: coupon.code,
    discount_amount,
    beneficiary_type: coupon.beneficiary_type,
  };
};

// ------------------------------------- DELETE COUPON ------------------------------------
const deleteCoupons = async ({ ids }: { ids: string[] }) => {
  await prisma.coupon.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  return null;
};

export const CouponServices = {
  createCoupon,
  getCoupons,
  updateCouponActiveStatus,
  applyCoupon,
  updateCoupon,
  deleteCoupons,
};
