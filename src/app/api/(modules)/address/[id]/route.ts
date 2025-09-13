
import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";

import { AddressServices } from "../address.service";
import { AddressValidations } from "../address.validation";

export const PATCH = catchAsync(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
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
    await payloadValidator(AddressValidations.updateAddressValidationSchema, body);

    // Step 4: Call service to update address
    const result = await AddressServices.updateAddress(id, body, user);

    // Step 5: Return success response with address data
    return successResponse({
        statusCode: httpStatus.OK,
        message: "Address updated successfully",
        data: result,
    });
});