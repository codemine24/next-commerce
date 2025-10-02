"use server";

import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { Order } from "@/zod/order-schema";

export const createOrderForGuestUser = async (data: Order) => {
    const res = await api.post(API_ROUTES.order.create_order_for_guest_user, {
        body: JSON.stringify(data)
    });
    return res;
};

export const createOrderForLoggedInUser = async (data: Order) => {
    const res = await api.post(API_ROUTES.order.create_order_for_user, {
        body: JSON.stringify(data)
    });

    return res;
};
