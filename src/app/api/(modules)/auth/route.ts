import errorHandler from "@/app/api/(helpers)/error/error-handler";
import {
  ErrorPayload,
  errorResponse,
  successResponse,
} from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import httpStatus from "http-status";
import { AuthSchemas } from "./schema";
import { AuthServices } from "./service";

// ✅ POST: Create new user
export async function POST(req: Request) {
  try {
    const body = await req.json();

    await payloadValidator(AuthSchemas.registerUser, body);

    const result = await AuthServices.registerUser(body);

    return successResponse({
      statusCode: httpStatus.CREATED,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    const error = err as ErrorPayload;
    const formattedError = errorHandler(error);
    return errorResponse(formattedError);
  }
}
