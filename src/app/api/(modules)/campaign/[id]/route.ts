import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";

import { CampaignSchemas } from "../campaign.schema";
import { CampaignServices } from "../campaign.service";



// ---------------------------------- GET CAMPAIGN DETAILS -----------------------------
export const GET = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    // Step 1: Extract search parameters from the request URL
    const searchParams = req.nextUrl.searchParams;

    // Step 2: Convert search parameters into a plain object
    const queryParams = Object.fromEntries(searchParams.entries());

    // Step 3: Extract id from route params
    const id = (await params).id;

    // Step 4: Call service to get campaign details
    const result = await CampaignServices.getCampaignDetails(id, queryParams);

    // Step 5: Return success response with campaign details
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Campaign details fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

// ---------------------------------- UPDATE CAMPAIGN ----------------------------------
export const PATCH = catchAsync(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    // Step 1: Authenticate user
    await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

    // Step 2: Parse request body
    const body = await req.json();

    // Step 3: Validate request body against schema
    await payloadValidator(CampaignSchemas.updateCampaign, body);

    // Step 4: Extract id from route params
    const id = (await params).id;

    // Step 4: Call service to update campaign
    const result = await CampaignServices.updateCampaign(id, body);

    // Step 5: Return success response with campaign data
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Campaign updated successfully",
      data: result,
    });
  }
);
