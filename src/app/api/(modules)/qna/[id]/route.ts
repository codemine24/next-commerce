import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";

import { QnASchemas } from "../qna.schema";
import { QnAServices } from "../qna.service";

// ---------------------------------- EDIT QUESTION BY CUSTOMER ---------------------------
export const PATCH = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Step 1: Authenticate user
    const user = await userAuthenticator(request, [UserRole.CUSTOMER]);

    // Step 2: Extract id from route params
    const id = (await params).id;

    // Step 3: Parse request body
    const body = await request.json();

    // Step 4: Validate request body against update question by customer schema
    await payloadValidator(QnASchemas.editQuestion, body);

    // Step 5: Call service layer to update question by customer in database
    const result = await QnAServices.editQuestion(id, body, user);

    // Step 6: Return success response with updated question
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Question updated successfully",
      data: result,
    });
  }
);
