"use server";

import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { ProductSchema } from "@/zod/product-schema";

export const addProduct = async (product: ProductSchema) => {
    const res = await api.post(API_ROUTES.products.create_product, {
        body: JSON.stringify(product),
    });

    return res;
}