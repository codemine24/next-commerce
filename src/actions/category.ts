"use server";

import { revalidateTag } from "next/cache";

import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { CategorySchema } from "@/zod/category-schema";

export const getCategories = async () => {
    const res = await api.get(API_ROUTES.categories.get_categories, {
        next: { tags: ["categories"] }
    });
    return res;
}

export const addCategory = async (category: CategorySchema) => {
    const res = await api.post(API_ROUTES.categories.create_category, {
        body: JSON.stringify(category),
    });

    if (res.success) {
        revalidateTag("categories");
    }

    return res;
}