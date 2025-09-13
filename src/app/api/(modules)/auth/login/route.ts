import httpStatus from "http-status";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";

import { AuthSchemas } from "../auth.schema";
import { AuthServices } from "../auth.service";

// ------------------------------------ LOGIN USER -----------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Parse request body
  const body = await req.json();

  // Step 2: Validate request body against login schema
  await payloadValidator(AuthSchemas.login, body);

  // Step 3: Call authentication service to log in user
  const result = await AuthServices.login(body);

  // Step 4: Return success response with logged-in user data (e.g., tokens)
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "User logged in successfully",
    data: result,
  });
});
