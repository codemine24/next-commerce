import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import { picker } from "@/app/api/(helpers)/utils/picker";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";

import { OrderServices } from "../order.service";
import { orderFilterableFields } from "../order.utils";

// ------------------------------------- MY ORDERS ---------------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.CUSTOMER,
  ]);

  // Step 2: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 3: Convert search parameters into a plain object and filter invalid query parameters
  const queryParams = Object.fromEntries(searchParams.entries());
  const filteredQueryParams = picker(queryParams, orderFilterableFields);

  // Step 4: Fetch orders from the service layer using query parameters
  const result = await OrderServices.myOrders(user, filteredQueryParams);

  // Step 5: Return success response with orders and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Orders fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
