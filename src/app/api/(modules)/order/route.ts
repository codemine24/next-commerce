import { UserRole } from "@prisma/client";
import httpStatus from "http-status";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";

import { OrderSchemas } from "./order.schema";
import { OrderServices } from "./order.service";


// ------------------------------------- CREATE COUPON ------------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [
    UserRole.CUSTOMER,
    UserRole.CUSTOMER,
  ]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(OrderSchemas.placeOrderForRegisteredUser, body);

  // Step 4: Call service to create coupon
  const result = await OrderServices.placeOrderForRegisteredUser(user, body);

  // Step 5: Return success response with coupon data
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Order placed successfully",
    data: result,
  });
});
