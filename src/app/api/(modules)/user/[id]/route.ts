import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";

import { UserSchemas } from "../user.schema";
import { UserServices } from "../user.servicev2";

// ----------------------------------- GET USER --------------------------------------------
export const GET = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Step 1: Authenticate user
    await userAuthenticator(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN]);

    // Step 2: Extract id from params
    const id = (await params).id;

    // Step 3: Call service layer to get user by admin from database
    const result = await UserServices.getUserByAdmin(id);

    // Step 6: Return success response with user data
    return successResponse({
      statusCode: httpStatus.OK,
      message: "User data fetched successfully",
      data: result,
    });
  }
);

// ----------------------------------- UPDATE USER -----------------------------------------
export const PATCH = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Step 1: Authenticate user
    await userAuthenticator(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN]);

    // Step 2: Extract id from params
    const id = (await params).id;

    // Step 3: Parse request body
    const body = await request.json();

    // Step 4: Validate request body against update user by admin schema
    await payloadValidator(UserSchemas.updateUserByAdmin, body);

    // Step 5: Call service layer to update user by admin in database
    const result = await UserServices.updateUserByAdmin(id, body);

    // Step 6: Return success response with updated data
    return successResponse({
      statusCode: httpStatus.OK,
      message: "User updated successfully",
      data: result,
    });
  }
);
