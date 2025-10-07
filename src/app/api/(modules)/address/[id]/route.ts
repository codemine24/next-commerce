import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";

import { AddressValidations } from "../address.schema";
import { AddressServices } from "../address.service";

export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    // Step 1: Authenticate user
    const user = await userAuthenticator(req, [
      UserRole.SUPER_ADMIN,
      UserRole.ADMIN,
      UserRole.CUSTOMER,
    ]);

    // Step 2: Parse request body
    const body = await req.json();
    const { id } = await params;

    // Step 3: Validate request body against schema
    await payloadValidator(AddressValidations.updateAddress, body);

    // Step 4: Call service to update address
    const result = await AddressServices.updateAddress(id, body, user);

    // Step 5: Return success response with address data
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Address updated successfully",
      data: result,
    });
  }
);

export const GET = catchAsync(async (req:NextRequest,  { params }: { params: Promise<{ id: string }> }) => {
   // Step 1: Authenticate user
   await userAuthenticator(req, [
      UserRole.SUPER_ADMIN,
      UserRole.ADMIN,
      UserRole.CUSTOMER,
    ]);

      // Step 2: Extract id from route params
  const id = (await params).id;

      // Step 3: Call service to get address
    const result = await AddressServices.getSingleAddress(id);

    // Step 4: Return success response with address data
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Address retrieved successfully",
      data: result,
    });

})