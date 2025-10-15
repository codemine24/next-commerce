import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { PaymentSchemas } from "./payment.schema";
import { PaymentServices } from "./payment.service";

// ------------------------------------- UPDATE PAYMENT INFO --------------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(PaymentSchemas.updatePaymentInfo, body);

  // Step 4: Call service to update payment info
  const result = await PaymentServices.updatePaymentInfo(body);

  // Step 5: Return success response
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Payment info updated successfully",
    data: result,
  });
});

// ------------------------------------- GET PAYMENT HISTORY --------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 3: Convert search parameters into a plain object and filter invalid query parameters
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 4: Fetch payment histoies from the service layer using query parameters
  const result = await PaymentServices.getPaymentHistory(queryParams);

  // Step 5: Return success response with payment histories and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Payment history fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
