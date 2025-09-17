"use server";

import { revalidateTag } from "next/cache";

import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { ProductSchema } from "@/zod/product-schema";

export const addProduct = async (product: ProductSchema) => {
    const res = await api.post(API_ROUTES.products.create_product, {
        body: JSON.stringify(product),
    });

    if (res.success) revalidateTag("products");

    return res;
}

export const getProducts = async () => {
    const res = await api.get(API_ROUTES.products.get_products);
    return res;
}
