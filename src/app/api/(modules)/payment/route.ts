import httpStatus from "http-status";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import payloadValidator from "../../(helpers)/utils/payload-validator";

import { PaymentSchemas } from "./payment.schema";
import { PaymentServices } from "./payment.service";

// ------------------------------------- UPDATE PAYMENT INFO --------------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(PaymentSchemas.updatePaymentInfo, body);

  // Step 4: Call service to update payment info
  const result = await PaymentServices.updatePaymentInfo(body);

  // Step 5: Return success response
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Payment info updated successfully",
    data: result,
  });
});
