import httpStatus from 'http-status';
import { NextRequest } from "next/server";

import { catchAsync } from "../../(helpers)/shared/catch-async";
import { successResponse } from "../../(helpers)/shared/response";
import payloadValidator from "../../(helpers)/utils/payload-validator";

import { CouponValidations } from "./coupon.schema";
import { couponServices } from "./coupon.service";

export const POST = catchAsync(async (req: NextRequest) => {
    // Step 1: Parse request body
    const body = await req.json();

    // Step 2: Validate request body against schema
    await payloadValidator(CouponValidations.createCouponValidationSchema, body);

    // Step 3: Call service to add new brand
    const result = await couponServices.createCoupon(body);

    // Step 4: Return success response with created brand
    return successResponse({
        statusCode: httpStatus.CREATED,
        message: "Coupon created successfully",
        data: result,
    });
});