import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";

import { FileSchemas } from "../file.schema";
import { FileServices } from "../file.service";

// ------------------------------------- UPDATE FILE ----------------------------------------
export const PATCH = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Step 1: Authenticate user
    await userAuthenticator(request, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

    // Step 2: Extract id from route params
    const id = (await params).id;

    // Step 3: Parse request body
    const body = await request.json();

    // Step 4: Validate request body against update file schema
    await payloadValidator(FileSchemas.updateFile, body);

    // Step 5: Call service layer to update file in database
    const result = await FileServices.updateFile(id, body);

    // Step 6: Return success response with updated file
    return successResponse({
      statusCode: httpStatus.OK,
      message: "File updated successfully",
      data: result,
    });
  }
);

// ------------------------------------- GET FILE (SINGLE) ----------------------------------
export const GET = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Step 1: Extract id from params
    const id = (await params).id;

    // Step 2: Fetch file by id
    const file = await FileServices.getFile(id);

    // Step 3: Return success response
    return successResponse({
      statusCode: httpStatus.OK,
      message: "File fetched successfully",
      data: file,
    });
  }
);
