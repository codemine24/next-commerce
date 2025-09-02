import errorHandler from "@/app/api/(helpers)/error/error-handler";
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

// GET: Get single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;

    const product = await ProductServices.getProduct(slug);
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (err) {
    const error = err as ErrorPayload;
    const formattedError = errorHandler(error);
    return errorResponse(formattedError);
  }
}

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

// PATCH: Update product
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    const body = await request.json();

    await payloadValidator(ProductSchemas.updateProduct, body);

    const result = await ProductServices.updateProduct(slug, body);
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Product updated successfully",
      data: result,
    });
  } catch (err) {
    const error = err as ErrorPayload;
    const formattedError = errorHandler(error);
    return errorResponse(formattedError);
  }
}
