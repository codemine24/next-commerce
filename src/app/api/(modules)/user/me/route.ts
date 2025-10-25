import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";

import { UserServices } from "../user.service";

// ----------------------------------- GET PROFILE ----------------------------------------
export const GET = catchAsync(async (request: NextRequest) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(request, ["CUSTOMER"]);

  // Step 2: Call service layer to get profile in database
  const result = await UserServices.getProfile(user);

  // Step 3: Return success response with profile data
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Profile fetched successfully",
    data: result,
  });
});
