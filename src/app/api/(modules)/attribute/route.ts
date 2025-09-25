import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import { commonSchemas } from "../../(helpers)/shared/schema";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { AttributeSchemas } from "./attribute.schema";
import { AttributeServices } from "./attribute.service";

// ------------------------------------ CREATE ATTRIBUTE --------------------------------------
export const POST = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(AttributeSchemas.createAttribute, body);

  // Step 4: Call service to create attribute
  const result = await AttributeServices.createAttribute(body);

  // Step 5: Return success response with attribute data
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Attribute created successfully",
    data: result,
  });
});

// ------------------------------------ GET ALL ATTRIBUTES ------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 2: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 3: Fetch attributes from the service layer using query parameters
  const result = await AttributeServices.getAttributes(queryParams);

  // Step 4: Return success response with attributes and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Attributes fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// ------------------------------------ DELETE ATTRIBUTES -------------------------------------
export const DELETE = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(commonSchemas.deleteRecordsValidationSchema, body);

  // Step 3: Delete attributes from the service layer
  const result = await AttributeServices.deleteAttributes(body);

  // Step 4: Return success response with attributes and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Attributes deleted successfully",
    data: result,
  });
});
