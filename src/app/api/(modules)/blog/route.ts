import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import { commonSchemas } from "../../(helpers)/shared/schema";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { BlogSchemas } from "./blog.schema";
import { BlogServices } from "./blog.service";

// ------------------------------------ CREATE POST ------------------------------------
export const POST = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
  ]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(BlogSchemas.createPost, body);

  // Step 4: Call service to create post
  const result = await BlogServices.createPost(user, body);

  // Step 5: Return success response with post data
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Post created successfully",
    data: result,
  });
});

// ------------------------------------ GET POST'S -------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 2: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 3: Fetch posts from the service layer using query parameters
  const result = await BlogServices.getPosts(queryParams);

  // Step 4: Return success response with posts and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Posts fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// ------------------------------------ DELETE POST'S ----------------------------------
export const DELETE = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(commonSchemas.deleteRecordsValidationSchema, body);

  // Step 3: Delete posts from the service layer
  const result = await BlogServices.deletePosts(body);

  // Step 4: Return success response
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Posts deleted successfully",
    data: result,
  });
});
