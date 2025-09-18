"use server";

import { revalidateTag } from "next/cache";

import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { ProductSchema } from "@/zod/product-schema";

export const getProducts = async () => {
    const res = await api.get(API_ROUTES.products.get_products, {
        next: { tags: ["products"] }
    });
    return res;
}

export const getProductBySlug = async (slug: string) => {
    const res = await api.get(API_ROUTES.products.get_product_by_slug(slug), {
        next: { tags: ["product"] }
    });
    return res;
}

export const addProduct = async (product: ProductSchema) => {
    const res = await api.post(API_ROUTES.products.create_product, {
        body: JSON.stringify(product),
    });

    if (res.success) revalidateTag("products");

    return res;
}
