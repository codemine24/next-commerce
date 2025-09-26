"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
import { SearchParams } from "@/interfaces/common";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { makeQueryParams } from "@/utils/helper";
import { BrandSchema } from "@/zod/brand-schema";

export const getBrands = async (query?: SearchParams) => {
    let url = API_ROUTES.brands.get_brands;

    if (query && Object.keys(query).length > 0) {
        const queryParams = makeQueryParams(query);
        url += `?${queryParams}`;
    }

    const res = await api.get(url, {
        next: { tags: [TAGS.brands] }
    });
    return res;
}

export const addBrand = async (brand: BrandSchema) => {
    const res = await api.post(API_ROUTES.brands.create_brand, {
        body: JSON.stringify(brand),
    });

    if (res.success) revalidateTag(TAGS.brands);

    return res;
}

export const updateBrand = async (id: string, brand: BrandSchema) => {
    const res = await api.patch(API_ROUTES.brands.update_brand(id), {
        body: JSON.stringify(brand),
    });

    if (res.success) revalidateTag(TAGS.brands);

    return res;
}

export const deleteBrand = async (ids: string[]) => {
    const res = await api.delete(API_ROUTES.brands.delete_brand, {
        body: JSON.stringify({ ids }),
    });

    if (res.success) revalidateTag(TAGS.brands);

    return res;
}
