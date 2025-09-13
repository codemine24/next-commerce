import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { UserServices } from "./user.service";
import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

// ----------------------------------- GET USERS ----------------------------------------
export const GET = catchAsync(async (request: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN]);

  // Step 2: Extract search parameters from the request URL
  const searchParams = request.nextUrl.searchParams;

  // Step 3: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 4: Call service layer to get profile in database
  const result = await UserServices.getUsers(queryParams);

  // Step 5: Return success response with profile data
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Profile fetched successfully",
    data: result,
  });
});
