import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import { commonSchemas } from "../../(helpers)/shared/schema";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { CampaignSchemas } from "./campaign.schema";
import { CampaignServices } from "./campaign.service";


// ---------------------------------- CREATE CAMPAIGN ----------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
  ]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(CampaignSchemas.createCampaign, body);

  // Step 4: Call service to create campaign
  const result = await CampaignServices.createCampaign(body);

  // Step 5: Return success response with campaign data
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Campaign created successfully",
    data: result,
  });
});

// ---------------------------------- GET CAMPAIGNS ------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 2: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 3: Fetch campaigns from the service layer using query parameters
  const result = await CampaignServices.getCampaigns(queryParams);

  // Step 4: Return success response with camapigns and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Campaigns fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// ---------------------------------- DELETE CAMPAIGNS ---------------------------------
export const DELETE = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(commonSchemas.deleteRecordsValidationSchema, body);

  // Step 3: Delete campaigns from the service layer
  const result = await CampaignServices.deleteCampaigns(body);

  // Step 4: Return success response
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Campaigns deleted successfully",
    data: result,
  });
});
