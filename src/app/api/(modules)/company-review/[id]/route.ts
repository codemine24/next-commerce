import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";

import { CompanyReviewSchemas } from "../company-review.schema";
import { CompanyReviewServices } from "../company-review.service";

// ---------------------------------------- UPDATE COMPANY REVIEW ---------------------------------
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

    // Step 4: Validate request body against update company review schema
    await payloadValidator(CompanyReviewSchemas.updateCompanyReview, body);

    // Step 5: Call service layer to update company review in database
    const result = await CompanyReviewServices.updateCompanyReview(id, body);

    // Step 6: Return success response
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Company review updated successfully",
      data: result,
    });
  }
);
