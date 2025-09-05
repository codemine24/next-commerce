import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";
import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
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
