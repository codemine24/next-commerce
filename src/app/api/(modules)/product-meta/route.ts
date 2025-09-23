import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { ProductMetaServices } from "./product-meta.service";

// ---------------------------------- GET PRODUCT META --------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 3: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 4: Fetch product meta from the service layer using query parameters
  const result = await ProductMetaServices.getProductMeta(queryParams);

  // Step 5: Return success response with product meta
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Product meta fetched successfully",
    data: result,
  });
});
