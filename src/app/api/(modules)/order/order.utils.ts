import {
  DeliveryMethod,
  OrderStatus,
  PaymentStatus,
  PaymentType,
} from "@prisma/client";

import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export const HOME_DELIVERY_CHARGE: number = 65;

export const orderSortableFields = [
  "order_id",
  "payment_type",
  "delivery_method",
  "order_status",
  "payment_status",
  "delivery_charge",
  "discount_amount",
  "sub_amount",
  "total_amount",
  "created_at",
  "updated_at",
];

export const orderSearchableFields = ["comment", "order_id"];
export const orderSearchableFieldsByAddress = [
  "name",
  "email",
  "contact_number",
  "address",
  "city",
  "district",
];

export const orderFilterableFields = [
  "address_id",
  "payment_type",
  "delivery_method",
  "order_status",
  "payment_status",
  "min_order_amount",
  "max_order_amount",
  "search_term",
  "page",
  "limit",
  "sort_by",
  "sort_order",
  "from_date",
  "to_date",
];

export const orderSelectedFields = {
  id: true,
  order_id: true,
  payment_type: true,
  delivery_method: true,
  delivery_charge: true,
  discount_amount: true,
  sub_amount: true,
  total_amount: true,
  tax: true,
  percentage_of_tax: true,
  payment_status: true,
  order_status: true,
  comment: true,
  order_items: {
    select: {
      product: {
        select: {
          name: true,
          thumbnail: true,
          product_code: true,
          warranty: true,
        },
      },
      quantity: true,
      price: true,
    },
  },
  user: {
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      avatar: true,
      contact_number: true,
    },
  },
  address: {
    select: {
      id: true,
      name: true,
      contact_number: true,
      secondary_contact_number: true,
      email: true,
      address: true,
      postal_code: true,
      city: true,
      district: true,
      country: true,
      is_default: true,
    },
  },
  coupon: {
    select: {
      code: true,
      discount_value: true,
    },
  },
  created_at: true,
  updated_at: true,
};

export const orderQueryValidationConfig: Record<string, any> = {
  payment_type: Object.values(PaymentType),
  delivery_method: Object.values(DeliveryMethod),
  order_status: Object.values(OrderStatus),
  payment_status: Object.values(PaymentStatus),
  sort_by: orderSortableFields,
  sort_order: SORT_ORDER_VALUE,
};

export const allowedTransitions: Record<string, OrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED_PAID: ["PROCESSING", "REFUNDED"],
  CONFIRMED_NOT_PAID: ["PROCESSING", "CANCELLED"],
  PROCESSING_PAID: ["SHIPPED", "REFUNDED"],
  PROCESSING_NOT_PAID: ["SHIPPED", "CANCELLED"],
  SHIPPED_PAID: ["DELIVERED", "REFUNDED"],
  SHIPPED_NOT_PAID: ["DELIVERED", "CANCELLED"],
  DELIVERED: [],
  CANCELLED: [],
  REFUNDED: [],
};

export const pickAllowedTransitions = (
  currentStatus: OrderStatus,
  paymentStatus: PaymentStatus
) => {
  if (
    currentStatus === "PENDING" ||
    currentStatus === "CANCELLED" ||
    currentStatus === "REFUNDED" ||
    currentStatus === "DELIVERED"
  ) {
    return allowedTransitions[currentStatus];
  }

  const suffix = paymentStatus === "PAID" ? "_PAID" : "_NOT_PAID";
  const composedStatus = `${currentStatus}${suffix}`;

  return allowedTransitions[composedStatus] || [];
};

export const refundCalculator = (order: any, penalty: number = 0) => {
  const paidAmount = order.payment?.amount || 0;
  const delivery_charge =
    order.order_status === "SHIPPED" ? order.delivery_charge : 0;
  const refund = paidAmount - (delivery_charge + penalty);

  return refund;
};
