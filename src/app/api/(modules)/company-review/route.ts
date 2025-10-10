import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import { commonSchemas } from "../../(helpers)/shared/schema";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { CompanyReviewSchemas } from "./company-review.schema";
import { CompanyReviewServices } from "./company-review.service";

// ---------------------------------------- ADD COMPANY REVIEW ------------------------------------
export const POST = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(CompanyReviewSchemas.createCompanyReview, body);

  // Step 4: Call service to create company review
  const result = await CompanyReviewServices.createCompanyReview(body);

  // Step 5: Return success response
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Company review created successfully",
    data: result,
  });
});

// ---------------------------------------- GET COMPANY REVIEWS -----------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 2: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 3: Fetch company reviews from the service layer using query parameters
  const result = await CompanyReviewServices.getCompanyReviews(queryParams);

  // Step 4: Return success response
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Company reviews fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// ---------------------------------------- DELETE COMPANY REVIEWS --------------------------------
export const DELETE = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(commonSchemas.deleteRecordsValidationSchema, body);

  // Step 3: Delete company reviews from the service layer
  const result = await CompanyReviewServices.deleteCompanyReviews(body);

  // Step 4: Return success response
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Company reviews deleted successfully",
    data: result,
  });
});
