import httpStatus from 'http-status';

import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import { convertConnectingData } from '../../(helpers)/utils/helper';

import { TCouponPayload } from "./coupon.interface";

const createCoupon = async (payload: TCouponPayload) => {
    const {
        start_date,
        expiration_date,
        eligible_brands,
        eligible_categories,
        eligible_products,
        ...remainingField
    } = payload;

    const modified_start_date = start_date ? new Date(start_date) : new Date();
    const modified_expiration_date = new Date(expiration_date);

    if (modified_start_date > modified_expiration_date) {
        throw new CustomizedError(
            httpStatus.BAD_REQUEST,
            "Start date cannot be greater than expiration date"
        );
    }

    const result = await prisma.coupon.create({
        data: {
            ...remainingField,
            start_date: modified_start_date,
            expiration_date: modified_expiration_date,
            eligible_categories: {
                connect: convertConnectingData(eligible_categories),
            },
            eligible_brands: {
                connect: convertConnectingData(eligible_brands),
            },
            eligible_products: {
                connect: convertConnectingData(eligible_products),
            },
        },
    });
    return result;
};

export const couponServices = {
    createCoupon,
};