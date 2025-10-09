import httpStatus from "http-status";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";

import { NewsletterSchemas } from "../newsletter.schema";
import { NewsletterServices } from "../newsletter.service";

// ------------------------------------- SUBSCRIBE IN NEWSLETTER ----------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(NewsletterSchemas.subscribeInNewsletter, body);

  // Step 4: Call service to subscribe in newsletter
  const result = await NewsletterServices.subscribeInNewsletter(body);

  // Step 5: Return success response
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Subscribed in newsletter successfully",
    data: result,
  });
});
