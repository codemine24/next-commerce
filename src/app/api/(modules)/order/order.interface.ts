import {
  DeliveryMethod,
  OrderStatus,
  PaymentStatus,
  PaymentType,
} from "@prisma/client";

import { AddressPayload } from "../address/address.interface";

export interface OrderPayloadForRegisteredUser {
  address?: AddressPayload;
  address_id?: string;
  payment_type?: PaymentType;
  delivery_method?: DeliveryMethod;
  coupon_code?: string;
  comment?: string;
}

export interface OrderPayloadForGuestUser {
  address?: AddressPayload;
  address_id?: string;
  order_items: OrderItem[];
  payment_type?: PaymentType;
  delivery_method?: DeliveryMethod;
  coupon_code?: string;
  comment?: string;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
}

export interface UpdateOrderByAdminPayload {
  delivery_method?: DeliveryMethod;
  payment_type?: PaymentType;
  order_status?: OrderStatus;
  payment_status?: PaymentStatus;
  comment?: string;
  order_history?: {
    remark?: string;
  };
  shipped_info?: {
    courier_id: string;
    tracking_id: string;
  };
  refund_info?: {
    penalty_charge: number;
  };
}

export interface UpdateOrderByCustomerPayload {
  delivery_method?: DeliveryMethod;
  payment_type?: PaymentType;
  comment?: string;
  address?: AddressPayload;
  address_id?: string;
}
