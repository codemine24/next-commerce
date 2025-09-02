import errorHandler from "@/app/api/(helpers)/error/error-handler";
import {
  ErrorPayload,
  errorResponse,
  successResponse,
} from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";
import { ProductSchemas } from "./product.schema";
import { ProductServices } from "./product.service";

// POST: Create new product
export async function POST(req: Request) {
  try {
    const authenticateUser = await userAuthenticator(req);
    console.log(authenticateUser);
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

// GET: Get all products
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const queryParams = Object.fromEntries(searchParams.entries());

    const result = await ProductServices.getProducts(queryParams);
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Products fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    const error = err as ErrorPayload;
    const formattedError = errorHandler(error);
    return errorResponse(formattedError);
  }
}
