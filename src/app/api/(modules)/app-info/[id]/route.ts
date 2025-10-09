import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";

import { AppInfoSchemas } from "../app-info.schema";
import { AppInfoServices } from "../app-info.service";

// ------------------------------------ UPDATE APP INFO ----------------------------------
export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    // Step 1: Authenticate user
    await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

    // Step 2: Parse request body
    const body = await req.json();
    const { id } = await params;

    // Step 3: Validate request body against schema
    await payloadValidator(AppInfoSchemas.updateAppInfo, body);

    // Step 4: Call service to update app info
    const result = await AppInfoServices.updateAppInfo(id, body);

    // Step 5: Return success response with updated app info
    return successResponse({
      statusCode: httpStatus.OK,
      message: "App info updated successfully",
      data: result,
    });
  }
);

// ------------------------------------ DELETE APP INFO ----------------------------------
export const DELETE = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    // Step 1: Authenticate user
    await userAuthenticator(req, [UserRole.SUPER_ADMIN]);

    // Step 2: Extract id from route params
    const id = (await params).id;

    // Step 3: Call service to get address
    const result = await AppInfoServices.deleteAppInfo(id);

    // Step 4: Return success response with address data
    return successResponse({
      statusCode: httpStatus.OK,
      message: "App info deleted successfully",
      data: result,
    });
  }
);
