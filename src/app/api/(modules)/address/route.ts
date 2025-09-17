import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { AddressValidations } from "./address.schema";
import { AddressServices } from "./address.service";

export const POST = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.CUSTOMER,
  ]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(AddressValidations.createAddress, body);

  // Step 4: Call service to create address
  const result = await AddressServices.createAddress(body, user);

  // Step 5: Return success response with address data
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Address created successfully",
    data: result,
  });
});

export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.CUSTOMER,
  ]);

  const searchParams = req.nextUrl.searchParams;

  // Step 2: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 3: Fetch addresses from the service layer using query parameters
  const result = await AddressServices.getAddresses(queryParams, user);

  // Step 4: Return success response with addresses and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Addresses fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const DELETE = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.CUSTOMER,
  ]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Call service to delete address
  const result = await AddressServices.deleteAddresses(body, user);
  // Step 4: Return success response with address data
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Address deleted successfully",
    data: result,
  });
});
