import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import { picker } from "../../(helpers)/utils/picker";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { OrderSchemas } from "./order.schema";
import { OrderServices } from "./order.service";
import { orderFilterableFields } from "./order.utils";

// ------------------------------------- PLACE ORDER (USER) ------------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [
    UserRole.CUSTOMER,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
  ]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(OrderSchemas.placeOrderForRegisteredUser, body);

  // Step 4: Call service to create coupon
  const result = await OrderServices.placeOrderForRegisteredUser(user, body);

  // Step 5: Return success response with coupon data
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Order placed successfully",
    data: result.order,
  });
});

// ------------------------------------- GET COUPONS --------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 3: Convert search parameters into a plain object and filter invalid query parameters
  const queryParams = Object.fromEntries(searchParams.entries());
  const filteredQueryParams = picker(queryParams, orderFilterableFields);

  // Step 4: Fetch orders from the service layer using query parameters
  const result = await OrderServices.getOrders(filteredQueryParams);

  // Step 5: Return success response with orders and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Orders fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
