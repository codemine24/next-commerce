import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import { formDataToObject } from "../../(helpers)/utils/helper";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { FileSchemas } from "./file.schema";
import { FileServices } from "./file.service";

// ----------------------------------- UPLOAD FILE -----------------------------------------
export const POST = catchAsync(async (request: NextRequest) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(request, [
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
  ]);

  // Step 2: Parse request body
  const body = await request.formData();
  console.log(body);
  const data = formDataToObject(body);
  console.log(data);
  // Step 3: Validate request body against update profile schema
  await payloadValidator(FileSchemas.uploadFiles, data);

  //   // Step 4: Call service layer to update profile in database
  const result = await FileServices.uploadFiles(data, user);

  // Step 5: Return success response with updated profile
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Files uploaded successfully",
    data: result,
  });
});

// ---------------------------------- GET ALL FILES ----------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.ADMIN, UserRole.SUPER_ADMIN]);

  // Step 2: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 3: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 4: Fetch files from the service layer using query parameters
  const result = await FileServices.getFiles(queryParams);

  // Step 5: Return success response with files and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Files fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// ---------------------------------- DELETE FILES -----------------------------------------
export const DELETE = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(FileSchemas.deleteFiles, body);

  // Step 3: Delete files from the database
  const result = await FileServices.deleteFiles(body);

  // Step 4: Return success response
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Categories deleted successfully",
    data: result,
  });
});
