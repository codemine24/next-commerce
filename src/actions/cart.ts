"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
import { CartPayload } from "@/interfaces/cart";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";

export const getCartForLogInUser = async () => {
    const res = await api.get(API_ROUTES.cart.get_cart, {
        next: { tags: [TAGS.cart] },
    });

    return res;
}

export const addToCartForLogInUser = async (payload: CartPayload[]) => {
    const res = await api.post(API_ROUTES.cart.add_to_cart, {
        body: JSON.stringify(payload),
    });

    if (res.success) revalidateTag(TAGS.cart);

    return res;
}

export const removedProductFromCartForLoginUser = async (id: string) => {
    const response = await api.delete(API_ROUTES.cart.remove_from_cart(id));

    if (response.success) revalidateTag(TAGS.cart);
    return response;
}