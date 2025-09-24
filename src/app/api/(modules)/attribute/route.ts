import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { AttributeSchemas } from "./attribute.schema";
import { AttributeServices } from "./attribute.service";

// ------------------------------------ CREATE ATTRIBUTE --------------------------------------
export const POST = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(AttributeSchemas.createAttribute, body);

  // Step 4: Call service to create attribute
  const result = await AttributeServices.createAttribute(body);

  // Step 5: Return success response with attribute data
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Attribute created successfully",
    data: result,
  });
});
