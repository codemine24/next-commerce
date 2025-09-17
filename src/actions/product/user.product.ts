"use server";

import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";

export const getProducts = async () => {
    const res = await api.get(API_ROUTES.products.get_products);
    return res;
}
