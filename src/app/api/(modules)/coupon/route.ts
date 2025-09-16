import { UserRole } from "@prisma/client";
import { catchAsync } from "../../(helpers)/shared/catch-async";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import { CouponSchemas } from "./coupon.schema";
import { CouponServices } from "./coupon.service";
import { successResponse } from "../../(helpers)/shared/response";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { commonSchemas } from "../../(helpers)/shared/schema";

// ------------------------------------- CREATE COUPON ------------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(CouponSchemas.createCoupon, body);

  // Step 4: Call service to create coupon
  const result = await CouponServices.createCoupon(body);

  // Step 5: Return success response with coupon data
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Coupon created successfully",
    data: result,
  });
});

// ------------------------------------- GET COUPONS --------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 3: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 4: Fetch coupons from the service layer using query parameters
  const result = await CouponServices.getCoupons(queryParams);

  // Step 5: Return success response with coupons and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Coupons fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// ------------------------------------- DELETE COUPONS -----------------------------------
export const DELETE = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(commonSchemas.deleteRecordsValidationSchema, body);

  // Step 3: Delete coupons from the database
  const result = await CouponServices.deleteCoupons(body);

  // Step 4: Return success response
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Coupons deleted successfully",
    data: result,
  });
});
