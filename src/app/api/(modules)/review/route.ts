import { UserRole } from "@prisma/client";
import httpStatus from "http-status";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { ReviewSchemas } from "./review.schema";
import { ReviewServices } from "./review.service";

// ---------------------------------- ADD REVIEW -----------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [UserRole.CUSTOMER]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(ReviewSchemas.createReview, body);

  // Step 4: Call service to add new review
  const result = await ReviewServices.createReview(user, body);

  // Step 5: Return success response with created review
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Review placed successfully",
    data: result,
  });
});
