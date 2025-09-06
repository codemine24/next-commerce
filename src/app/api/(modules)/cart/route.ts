import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import payloadValidator from "../../(helpers)/utils/payload-validator";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";
import { CartSchemas } from "./cart.schema";
import { CartServices } from "./cart.service";

// ---------------------------------- ADD TO CART -------------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.CUSTOMER,
  ]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(CartSchemas.addToCart, body);

  // Step 4: Call service to add to cart
  const result = await CartServices.addToCart(user, body);

  // Step 5: Return success response with cart data
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Product added to cart successfully",
    data: result,
  });
});

// ---------------------------------- GET CART ----------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  const user = await userAuthenticator(req, [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.CUSTOMER,
  ]);

  // Step 2: Fetch cart from the service layer
  const result = await CartServices.getCart(user);

  // Step 3: Return success response with cart data
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Cart fetched successfully",
    data: result,
  });
});
