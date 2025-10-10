import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import { commonSchemas } from "../../(helpers)/shared/schema";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { WishlistSchemas } from "./wishlist.schema";
import { WishlistServices } from "./wishlist.service";

// ---------------------------------- ADD TO WISHLIST -----------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [UserRole.CUSTOMER]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(WishlistSchemas.addToWishlist, body);

  // Step 4: Call service to add to wishlist
  const result = await WishlistServices.addToWishlist(user, body);

  // Step 5: Return success response
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Product added to wishlist successfully",
    data: result,
  });
});

// ---------------------------------- GET WISHLIST --------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [
    UserRole.CUSTOMER
  ]);

  // Step 2: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 3: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 4: Fetch wishlist from the service layer using query parameters
  const result = await WishlistServices.getWishlist(user, queryParams);

  // Step 5: Return success response with products and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Wishlist fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// ---------------------------------- REMOVE FROM WISHLIST ------------------------------
export const DELETE = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [
    UserRole.CUSTOMER
  ]);

  // Step 2: Parse request body
  const body = await req.json(); 
  await payloadValidator(commonSchemas.deleteRecordsValidationSchema, body);

  // Step 3: Delete orders from the database
  const result = await WishlistServices.removeFromWishlist(user, body);

  // Step 4: Return success response
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Product removed from wishlist successfully",
    data: result,
  });
});
