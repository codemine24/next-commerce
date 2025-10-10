import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { AppInfoSchemas } from "./app-info.schema";
import { AppInfoServices } from "./app-info.service";

// ------------------------------------ SET APP INFO -------------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(AppInfoSchemas.setAppInfo, body);

  // Step 4: Call service to set app info
  const result = await AppInfoServices.setAppInfo(body);

  // Step 5: Return success response with app info
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "App info set successfully",
    data: result,
  });
});

// ------------------------------------ GET APP INFO -------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 2: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 3: Fetch app info from the service layer using query parameters
  const result = await AppInfoServices.getAppInfo(queryParams);

  // Step 4: Return success response with app info
  return successResponse({
    statusCode: httpStatus.OK,
    message: "App info fetched successfully",
    data: result,
  });
});
