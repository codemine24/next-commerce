import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";
import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { CategorySchemas } from "../category.schema";
import { CategoryServices } from "../category.service";

// ----------------------------------- GET SINGLE CATEGORY ---------------------------------------
export const GET = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Step 1: Extract id from params
    const id = (await params).id;

    // Step 2: Fetch category by id
    const category = await CategoryServices.getCategory(id);

    // Step 3: Return success response
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Category fetched successfully",
      data: category,
    });
  }
);

// ----------------------------------- UPDATE CATEGORY -------------------------------------------
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

    // Step 4: Validate request body against update category schema
    await payloadValidator(CategorySchemas.updateCategory, body);

    // Step 5: Call service layer to update category in database
    const result = await CategoryServices.updateCategory(id, body);

    // Step 6: Return success response with updated category
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Category updated successfully",
      data: result,
    });
  }
);
