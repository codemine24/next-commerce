"use server";

import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";

export const createOrderForGuestUser = async (data: any) => {
    const res = await api.post(API_ROUTES.order.create_order_for_guest_user, {
        body: JSON.stringify(data)
    });
    return res.data;
};