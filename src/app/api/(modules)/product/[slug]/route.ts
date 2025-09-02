import errorHandler from "@/app/api/(helpers)/error/error-handler";
import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import {
  ErrorPayload,
  errorResponse,
  successResponse,
} from "@/app/api/(helpers)/shared/response";
import payloadValidator from "@/app/api/(helpers)/utils/payload-validator";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { ProductSchemas } from "../product.schema";
import { ProductServices } from "../product.service";

// ----------------------------------- GET SINGLE PRODUCT -------------------------------------
export const GET = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    // Step 1: Extract slug from params
    const slug = (await params).slug;

    // Step 2: Fetch product by slug
    const product = await ProductServices.getProduct(slug);

    // Step 3: Return success response
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Product fetched successfully",
      data: product,
    });
  }
);

// ----------------------------------- UPDATE PRODUCT -----------------------------------------
export const PATCH = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    // Step 1: Extract slug from route params
    const slug = (await params).slug;

    // Step 2: Parse request body
    const body = await request.json();

    // Step 3: Validate request body against update product schema
    await payloadValidator(ProductSchemas.updateProduct, body);

    // Step 4: Call service layer to update product in database
    const result = await ProductServices.updateProduct(slug, body);

    // Step 5: Return success response with updated product
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Product updated successfully",
      data: result,
    });
  }
);

// DELETE: Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const product = await ProductServices.deleteProduct(id);
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Products deleted successfully",
      data: product,
    });
  } catch (err) {
    const error = err as ErrorPayload;
    const formattedError = errorHandler(error);
    return errorResponse(formattedError);
  }
}
