import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";

import { PaymentServices } from "../payment.service";

// ------------------------------------- CREATE PAYMENT SESSION -----------------------------------
export const POST = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ order_id: string }> }
  ) => {
    // Step 2: Extract order id from params
    const orderId = (await params).order_id;

    // Step 3: Call service to create payment session
    const paymentSession = await PaymentServices.createPaymentSession(orderId);

    // Step 4: Return success response
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Payment session created successfully",
      data: paymentSession,
    });
  }
);
