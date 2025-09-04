import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";
import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { BrandSchemas } from "../brand.schema";
import { BrandServices } from "../brand.service";

// ----------------------------------- GET SINGLE BRAND ---------------------------------------
export const GET = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Step 1: Extract id from params
    const id = (await params).id;

    // Step 2: Fetch brand by id
    const brand = await BrandServices.getBrand(id);

    // Step 3: Return success response
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Brand fetched successfully",
      data: brand,
    });
  }
);

// ----------------------------------- UPDATE BRAND -------------------------------------------
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

    // Step 4: Validate request body against update brand schema
    await payloadValidator(BrandSchemas.updateBrand, body);

    // Step 5: Call service layer to update brand in database
    const result = await BrandServices.updateBrand(id, body);

    // Step 6: Return success response with updated brand
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Brand updated successfully",
      data: result,
    });
  }
);
