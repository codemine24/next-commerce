"use server";

import dayjs from "dayjs";
import { revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
import { SearchParams } from "@/interfaces/common";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { makeQueryParams } from "@/utils/helper";
import { CouponSchema } from "@/zod/coupon-schema";


const makePayload = (coupon: CouponSchema) => {
    return {
        ...coupon,
        eligible_categories: coupon?.eligible_categories?.map((category) => category.value),
        eligible_brands: coupon?.eligible_brands?.map((brand) => brand.value),
        eligible_products: coupon?.eligible_products?.map((product) => product.value),
        start_date: coupon?.start_date ? dayjs(coupon.start_date).format("YYYY-MM-DD") : undefined,
        expiration_date: coupon?.expiration_date ? dayjs(coupon.expiration_date).format("YYYY-MM-DD") : undefined,
    }
}

export const getCoupons = async (queries?: SearchParams) => {
    let url = API_ROUTES.coupons.get_coupons;

    if (queries && Object.keys(queries).length > 0) {
        const queryParams = makeQueryParams(queries);
        url += `?${queryParams}`;
    }

    const res = await api.get(url, { next: { tags: [TAGS.coupons] } });
    return res;
}

export const getCouponById = async (id: string) => {
    const res = await api.get(API_ROUTES.coupons.get_coupon_by_id(id), {
        next: { tags: [TAGS.coupon] }
    });

    return res;
}

export const createCoupon = async (coupon: CouponSchema) => {
    const payload = makePayload(coupon);
    const res = await api.post(API_ROUTES.coupons.create_coupon, {
        body: JSON.stringify(payload),
    });

    if (res.success) revalidateTag(TAGS.coupons);
    return res;
};

export const updateCoupon = async (id: string, coupon: CouponSchema) => {
    const payload = makePayload(coupon);
    const res = await api.patch(API_ROUTES.coupons.update_coupon(id), {
        body: JSON.stringify(payload),
    });

    if (res.success) {
        revalidateTag(TAGS.coupons);
        revalidateTag(TAGS.coupon);
    }
    return res;
};

export const deleteCoupon = async (ids: string[]) => {
    const res = await api.delete(API_ROUTES.coupons.delete_coupon, {
        body: JSON.stringify({ ids }),
    });

    if (res.success) {
        revalidateTag(TAGS.coupons);
        revalidateTag(TAGS.coupon);
    }
    return res;
};
