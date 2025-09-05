import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";
import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { CartSchemas } from "../cart.schema";
import { CartServices } from "../cart.service";

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

    // Step 4: Validate request body against update cart schema
    await payloadValidator(CartSchemas.updateCartItem, body);

    // Step 5: Call service layer to update cart in database
    const result = await CartServices.updateCartItem(id, body);

    // Step 6: Return success response with updated cart
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Cart updated successfully",
      data: result,
    });
  }
);
