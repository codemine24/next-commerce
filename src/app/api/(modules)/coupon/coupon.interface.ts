import { BeneficiaryType, DiscountType } from "@prisma/client";

export interface CouponPayload {
  code: string;
  discount_type?: DiscountType;
  discount_value: number;
  maximum_value?: number;
  start_date?: string;
  expiration_date: string;
  usage_limit?: number;
  per_user_limit?: number;
  min_order_amount?: number;
  min_product_amount?: number;
  beneficiary_type?: BeneficiaryType;
  eligible_categories?: string[];
  eligible_brands?: string[];
  eligible_products?: string[];
}

export interface ApplyCouponPayload {
  code: string;
  email?: string;
  order_amount: number;
  product_amount: number;
  user?: {
    id: string;
    _count: {
      orders: number;
    };
  };
}

export interface ApplyCouponResponse {
  id: string;
  code: string;
  discount_amount: number;
  beneficiary_type: BeneficiaryType;
}
