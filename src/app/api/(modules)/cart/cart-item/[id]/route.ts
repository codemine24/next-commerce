import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";

import { CartSchemas } from "../../cart.schema";
import { CartServices } from "../../cart.service";

// ------------------------------------ REMOVE ITEM FROM CART --------------------------
export const DELETE = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Step 1: Authenticate user
    const user = await userAuthenticator(request, [
      UserRole.SUPER_ADMIN,
      UserRole.ADMIN,
      UserRole.CUSTOMER,
    ]);

    // Step 2: Extract id from route params
    const cartItemId = (await params).id;

    // Step 3: Call service layer to remove cart item from database
    const result = await CartServices.removeItemFromCart(user, cartItemId);

    // Step 4: Return success response
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Cart item removed successfully",
      data: result,
    });
  }
);

// ----------------------------------- UPDATE CART ITEM -------------------------------------
export const PATCH = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Step 1: Authenticate user
    await userAuthenticator(request, [
      UserRole.SUPER_ADMIN,
      UserRole.ADMIN,
      UserRole.CUSTOMER,
    ]);

    // Step 2: Extract id from route params
    const id = (await params).id;

    // Step 3: Parse request body
    const body = await request.json();

    // Step 4: Validate request body against update cart item schema
    await payloadValidator(CartSchemas.updateCartItem, body);

    // Step 5: Call service layer to update quantity in database
    const result = await CartServices.updateCartItem(id, body);

    // Step 6: Return success response
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Cart updated successfully",
      data: result,
    });
  }
);
