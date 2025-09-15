import { DeliveryMethod, PaymentType } from "@prisma/client";

import { TAddressPayload } from "../address/address.interface";

export type TOrderPayloadForRegisteredUser = {
    address?: TAddressPayload;
    address_id?: string;
    payment_type?: PaymentType;
    delivery_method?: DeliveryMethod;
    coupon_code?: string;
    comment?: string;
};

export type TOrderItem = {
    product_id: string;
    quantity?: number;
}

export type TOrderPayloadForGuestUser = {
    address: TAddressPayload;
    payment_type?: PaymentType;
    delivery_method?: DeliveryMethod;
    coupon_code?: string;
    comment?: string;
    order_items: TOrderItem[];
}