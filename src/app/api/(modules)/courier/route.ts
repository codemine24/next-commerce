import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import { commonSchemas } from "../../(helpers)/shared/schema";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { CourierSchemas } from "./courier.schema";
import { CourierServices } from "./courier.service";

// ------------------------------------- CREATE COURIER ------------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(CourierSchemas.addCourier, body);

  // Step 4: Call service to create courier
  const result = await CourierServices.addCourier(body);

  // Step 5: Return success response with courier data
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Courier created successfully",
    data: result,
  });
});

// ------------------------------------- GET COURIERS --------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 3: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 4: Fetch couriers from the service layer using query parameters
  const result = await CourierServices.getCouriers(queryParams);

  // Step 5: Return success response with couriers and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Couriers fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// ------------------------------------- DELETE COURIERS -----------------------------------
export const DELETE = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(commonSchemas.deleteRecordsValidationSchema, body);

  // Step 3: Delete couriers from the database
  const result = await CourierServices.deleteCouriers(body);

  // Step 4: Return success response
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Couriers deleted successfully",
    data: result,
  });
});
