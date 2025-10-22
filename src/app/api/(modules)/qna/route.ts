import { User, UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import CustomizedError from "../../(helpers)/error/customized-error";
import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import { commonSchemas } from "../../(helpers)/shared/schema";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { QnASchemas } from "./qna.schema";
import { QnAServices } from "./qna.service";

// ---------------------------------- CREATE QUESTION -------------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.CUSTOMER,
  ]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(QnASchemas.createQuestion, body);

  // Step 4: Call service to create new question
  const result = await QnAServices.createQuestion(user, body);

  // Step 5: Return success response with created question
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Question created successfully",
    data: result,
  });
});

// ---------------------------------- GET QUESTION & ANSWERS ------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  const token = req.headers.get("Authorization");

  let user: User | null = null;

  if (token) {
    user = await userAuthenticator(req, [
      UserRole.SUPER_ADMIN,
      UserRole.ADMIN,
      UserRole.CUSTOMER,
    ]);
  } else {
    if (!searchParams.get("product_id")) {
      throw new CustomizedError(
        httpStatus.BAD_REQUEST,
        "Product ID is required in the search params"
      );
    }
  }

  if (
    user &&
    user.role === UserRole.CUSTOMER &&
    !searchParams.get("product_id")
  ) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "Product ID is required in the search params"
    );
  }

  // Step 2: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 3: Fetch question and answers from the service layer using query parameters
  const result = await QnAServices.getQnAs(queryParams, user);

  // Step 4: Return success response with question and answers and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Question and answers fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// ---------------------------------- DELETE QnAs ------------------------------------
export const DELETE = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(commonSchemas.deleteRecordsValidationSchema, body);

  // Step 3: Delete qnas from the service layer
  const result = await QnAServices.deleteQnAs(body);

  // Step 4: Return success response
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Products deleted successfully",
    data: result,
  });
});
