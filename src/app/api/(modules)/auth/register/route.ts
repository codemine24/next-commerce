import httpStatus from "http-status";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";

import { AuthSchemas } from "../auth.schema";
import { AuthServices } from "../auth.service";

// ---------------------------------- REGISTER NEW USER ---------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Parse request body
  const body = await req.json();

  // Step 2: Validate request body against register user schema
  await payloadValidator(AuthSchemas.registerUser, body);

  // Step 3: Call authentication service to create a new user
  const result = await AuthServices.registerUser(body);

  // Step 4: Return success response with created user data
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "User created successfully",
    data: result,
  });
});
