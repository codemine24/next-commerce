import { successResponse } from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { catchAsync } from "../../(helpers)/shared/catch-async";
import { commonSchemas } from "../../(helpers)/shared/schema";
import userAuthenticator from "../../(helpers)/utils/user-authenticator";
import { ProductSchemas } from "./product.schema";
import { ProductServices } from "./product.service";

// ---------------------------------- CREATE NEW PRODUCT -----------------------------------
export const POST = catchAsync(async (req: Request) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(ProductSchemas.addProduct, body);

  // Step 4: Call service to add new product
  const result = await ProductServices.addProduct(body);

  // Step 5: Return success response with created product
  return successResponse({
    statusCode: httpStatus.CREATED,
    message: "Product created successfully",
    data: result,
  });
});

// ---------------------------------- GET ALL PRODUCTS -------------------------------------
export const GET = catchAsync(async (req: NextRequest) => {
  // Step 1: Extract search parameters from the request URL
  const searchParams = req.nextUrl.searchParams;

  // Step 2: Convert search parameters into a plain object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Step 3: Fetch products from the service layer using query parameters
  const result = await ProductServices.getProducts(queryParams);

  // Step 4: Return success response with products and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Products fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// ---------------------------------- DELETE PRODUCTS --------------------------------------
export const DELETE = catchAsync(async (req: NextRequest) => {
  // Step 1: Authenticate user
  await userAuthenticator(req, [UserRole.SUPER_ADMIN, UserRole.ADMIN]);

  // Step 2: Parse request body
  const body = await req.json();

  // Step 3: Validate request body against schema
  await payloadValidator(commonSchemas.deleteRecordsValidationSchema, body);

  // Step 3: Delete products from the service layer
  const result = await ProductServices.deleteProducts(body);

  // Step 4: Return success response with products and metadata
  return successResponse({
    statusCode: httpStatus.OK,
    message: "Products deleted successfully",
    data: result,
  });
});
