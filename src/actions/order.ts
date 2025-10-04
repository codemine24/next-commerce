"use server";

import { SearchParams } from "@/interfaces/common";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { Order } from "@/zod/order-schema";

export const getMyOrders = async () => {
  const url = API_ROUTES.order.get_my_orders;

  const res = await api.get(url, {
    next: { tags: [TAGS.brands] },
  });
  return res;
};

export const createOrderForGuestUser = async (data: Order) => {
  const res = await api.post(API_ROUTES.order.create_order_for_guest_user, {
    body: JSON.stringify(data),
  });
  return res;
};

export const createOrderForLoggedInUser = async (data: Order) => {
  const res = await api.post(API_ROUTES.order.create_order_for_user, {
    body: JSON.stringify(data),
  });

  return res;
};
