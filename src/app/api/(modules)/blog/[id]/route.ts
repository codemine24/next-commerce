import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";

import { BlogSchemas } from "../blog.schema";
import { BlogServices } from "../blog.service";

// ------------------------------------ GET SINGLE POST --------------------------------
export const GET = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Step 1: Extract id from params
    const id = (await params).id;

    // Step 2: Fetch post by id
    const result = await BlogServices.getSinglePost(id);

    // Step 3: Return success response
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Post fetched successfully",
      data: result,
    });
  }
);

// ------------------------------------ UPDATE POST ------------------------------------
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

    // Step 4: Validate request body against update post schema
    await payloadValidator(BlogSchemas.updatePost, body);

    // Step 5: Call service layer to update post in database
    const result = await BlogServices.updatePost(id, body);

    // Step 6: Return success response with updated post
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Post updated successfully",
      data: result,
    });
  }
);
