import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import payloadValidator from "../../(helpers)/utils/payload-validator";

import { NewsletterSchemas } from "./newsletter.schema";
import { NewsletterServices } from "./newsletter.service";

// ------------------------------------- CREATE OTP FOR NEWSLETTER --------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(NewsletterSchemas.createOtpForNewsletter, body);

  // Step 4: Call service to send otp
  const result = await NewsletterServices.createOtpForNewsletter(body);

  // Step 5: Return success response
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "OTP send successfully",
    data: result,
  });
});

// ------------------------------------- GET SUBSCRIBERS ------------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 2: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 3: Fetch subscribers from the service layer using query parameters
  const result = await NewsletterServices.getSubscribers(queryParams);

  // Step 4: Return success response with subscribers and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Subscribers fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
