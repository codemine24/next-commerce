import errorHandler from "@/app/api/(helpers)/error/error-handler";
import { ErrorPayload, errorResponse, successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import httpStatus from "http-status";
import { ProductServices } from "./product.service";
import { ProductSchemas } from "./product.schema";

// ✅ POST: Create new product
export async function POST(req: Request) {
  try {
    const body = await req.json();

    await payloadValidator(ProductSchemas.addProduct, body);

    const result = await ProductServices.addProduct(body);

    return successResponse({
      statusCode: httpStatus.CREATED,
      message: "Product created successfully",
      data: result,
    });
  } catch (err) {
    const error = err as ErrorPayload;
    const formattedError = errorHandler(error);
    return errorResponse(formattedError);
  }
}