import httpStatus from "http-status";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";

import { OrderSchemas } from "../order.schema";
import { createPaymentSession, OrderServices } from "../order.service";

// ------------------------------------- PLACE ORDER (GUEST) -----------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(OrderSchemas.placeOrderForGuestUser, body);

  // Step 4: Call service to create coupon
  const result = await OrderServices.placeOrderForGuestUser(body);

  let paymentSession;
  if (result?.line_items && result?.line_items?.length > 0) {
    paymentSession = await createPaymentSession(result?.line_items);
  }

  // Step 5: Return success response with coupon data
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Order placed successfully",
    data: {
      order: result.order,
      payment_url: paymentSession?.url || null,
    },
  });
});
