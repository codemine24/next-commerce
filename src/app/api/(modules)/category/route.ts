import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import { commonSchemas } from "../../(helpers)/shared/schema";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { CategorySchemas } from "./category.schema";
import { CategoryServices } from "./category.service";

// ---------------------------------- CREATE NEW CATEGORY -----------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(CategorySchemas.addCategory, body);

  // Step 4: Call service to add new category
  const result = await CategoryServices.addCategory(body);

  // Step 5: Return success response with created category
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Category created successfully",
    data: result,
  });
});

// ---------------------------------- GET ALL CATEGORIES ------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 2: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 3: Fetch categories from the service layer using query parameters
  const result = await CategoryServices.getCategories(queryParams);

  // Step 4: Return success response with categories and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Categories fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// ---------------------------------- DELETE CATEGORIES -------------------------------------
export const DELETE = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(commonSchemas.deleteRecordsValidationSchema, body);

  // Step 3: Delete categories from the service layer
  const result = await CategoryServices.deleteCategory(body);

  // Step 4: Return success response
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Categories deleted successfully",
    data: result,
  });
});
