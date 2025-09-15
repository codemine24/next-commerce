import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";

import { ReviewSchemas } from "../review.schema";
import { ReviewServices } from "../review.service";

// ---------------------------------- GET ALL REVIEWS BY PRODUCT ID -----------------------------
export const GET = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    // Step 1: Extract product id from params
    const productID = (await params).id;

    // Step 2: Extract search parameters from the request URL
    const searchParams = req.nextUrl.searchParams;

    // Step 3: Convert search parameters into a plain object
    const queryParams = Object.fromEntries(searchParams.entries());

    // Step 4: Fetch reviews from the service layer using query parameters
    const result = await ReviewServices.getReviewsByProductId(
      productID,
      queryParams
    );

    // Step 4: Return success response with reviews and metadata
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Reviews fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

// ---------------------------------- UPDATE REVIEW ---------------------------------------------
export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    // Step 1: Authenticate user
    const user = await userAuthenticator(req, [UserRole.CUSTOMER]);

    // Step 2: Parse request body
    const body = await req.json();

    // Step 3: Validate request body against schema
    await payloadValidator(ReviewSchemas.updateReview, body);

    // Step 4: Extract review id from params
    const reviewID = (await params).id;

    // Step 5: Update review in database
    const result = await ReviewServices.updateReview(reviewID, user, body);

    // Step 6: Return success response with updated review
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Review updated successfully",
      data: result,
    });
  }
);
