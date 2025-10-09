import httpStatus from "http-status";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import payloadValidator from "../../(helpers)/utils/payload-validator";

import { NewsletterSchemas } from "./newsletter.schema";
import { NewsletterServices } from "./newsletter.service";

// ------------------------------------- CREATE OTP FOR NEWSLETTER --------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(NewsletterSchemas.createOtpForNewsletter, body);

  // Step 4: Call service to send otp
  const result = await NewsletterServices.createOtpForNewsletter(body);

  // Step 5: Return success response
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "OTP send successfully",
    data: result,
  });
});
