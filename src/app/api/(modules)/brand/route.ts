import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import { commonSchemas } from "../../(helpers)/shared/schema";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";
import { BrandSchemas } from "./brand.schema";
import { BrandServices } from "./brand.service";

// ---------------------------------- CREATE NEW BRAND -------------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(BrandSchemas.addBrand, body);

  // Step 4: Call service to add new brand
  const result = await BrandServices.addBrand(body);

  // Step 5: Return success response with created brand
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Brand created successfully",
    data: result,
  });
});

// ---------------------------------- GET ALL BRANDS ---------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 2: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 3: Fetch brands from the service layer using query parameters
  const result = await BrandServices.getBrands(queryParams);

  // Step 4: Return success response with brands and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Brands fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// ---------------------------------- DELETE BRANDS ----------------------------------------
export const DELETE = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(commonSchemas.deleteRecordsValidationSchema, body);

  // Step 3: Delete brands from the service layer
  const result = await BrandServices.deleteBrands(body);

  // Step 4: Return success response with brands and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Brands deleted successfully",
    data: result,
  });
});
