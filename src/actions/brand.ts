"use server";

import { revalidateTag } from "next/cache";

import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { BrandSchema } from "@/zod/brand-schema";

export const getBrands = async () => {
    const res = await api.get(API_ROUTES.brands.get_brands, {
        next: { tags: ["brands"] }
    });
    return res;
}

export const addBrand = async (brand: BrandSchema) => {
    const res = await api.post(API_ROUTES.brands.create_brand, {
        body: JSON.stringify(brand),
    });

    if (res.success) revalidateTag("brands");

    return res;
}