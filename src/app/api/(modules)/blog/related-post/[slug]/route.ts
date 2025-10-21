import httpStatus from "http-status";
import { NextRequest } from "next/server";

import { catchAsync } from "@/app/api/(helpers)/shared/catch-async";
import { successResponse } from "@/app/api/(helpers)/shared/response";

import { BlogServices } from "../../blog.service";

// ------------------------------------ GET RELATED POST'S -----------------------------
export const GET = catchAsync(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    // Step 1: Extract slug from params
    const slug = (await params).slug;

    // Step 2: Fetch related post by slug
    const result = await BlogServices.getRelatedPosts(slug);

    // Step 3: Return success response
    return successResponse({
      statusCode: httpStatus.OK,
      message: "Related posts fetched successfully",
      data: result,
    });
  }
);
