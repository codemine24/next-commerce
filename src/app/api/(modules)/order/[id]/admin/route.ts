import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import userAuthenticator from "@/app/api/(helpers)/utils/user-authenticator";

import { OrderSchemas } from "../../order.schema";
import { OrderServices } from "../../order.service";

// ------------------------------------- UPDATE ORDER (ADMIN) ----------------------------------
export const PATCH = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    // Step 1: Authenticate user
    const user = await userAuthenticator(request, [
      UserRole.SUPER_ADMIN,
      UserRole.ADMIN,
    ]);

    // Step 2: Extract id from route params
    const id = (await params).id;

    // Step 3: Parse request body
    const body = await request.json();

    // Step 4: Validate request body against update order schema
    await payloadValidator(OrderSchemas.updateOrderByAdmin, body);

    // Step 5: Call service layer to update order in database
    const result = await OrderServices.updateOrderByAdmin(id, body, user);

    // Step 6: Return success response with updated order
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Order updated successfully",
      data: result,
    });
  }
);
