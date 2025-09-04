import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import { formDataToObject } from "@/app/api/(helpers)/utils/helper";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";
import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { UserSchemas } from "../user.schema";
import { UserServices } from "../user.service";

// ----------------------------------- UPDATE PROFILE -----------------------------------------
export const PATCH = catchAsync(async (request: NextRequest) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(request, [
    UserRole.ADMIN,
    UserRole.CUSTOMER,
    UserRole.SUPER_ADMIN,
  ]);

  // Step 2: Parse request body
  const body = await request.formData();
  const data = formDataToObject(body);

  // Step 3: Validate request body against update profile schema
  await payloadValidator(UserSchemas.updateProfile, data);

  // Step 4: Call service layer to update profile in database
  const result = await UserServices.updateProfile(user, data);

  // Step 5: Return success response with updated profile
  return successResponse({
    statusCode: httpStatus.OK,
    message: "User updated successfully",
    data: result,
  });
});
