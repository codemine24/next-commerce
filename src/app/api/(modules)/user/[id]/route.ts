import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import { formDataToObject } from "@/app/api/(helpers)/utils/helper";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { UserSchemas } from "../user.schema";
import { UserServices } from "../user.service";

// ----------------------------------- UPDATE USER -----------------------------------------
export const PATCH = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Step 1: Extract slug from route params
    const slug = (await params).id;

    // Step 2: Parse request body
    const body = await request.formData();
    const data = formDataToObject(body);

    // Step 3: Validate request body against update product schema
    await payloadValidator(UserSchemas.updateProfile, data);

    // Step 4: Call service layer to update product in database
    const result = await UserServices.updateProfile(slug, data?.data);

    // Step 5: Return success response with updated product
    return successResponse({
      statusCode: httpStatus.OK,
      message: "User updated successfully",
      data: result,
    });
  }
);
