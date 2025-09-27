import { BeneficiaryType, DiscountType } from "@prisma/client";

export interface Coupon {
    id: string;
    code: string;
    discount_type: DiscountType;
    discount_value: number;
    maximum_value: number | null;
    start_date: string;
    expiration_date: string;
    usage_limit: number | null;
    per_user_limit: number | null;
    min_order_amount: number | null;
    is_active: boolean;
    used_count: number;
    beneficiary_type: BeneficiaryType;
    created_at: string;
    updated_at: string;
    eligible_categories: {
        id: string;
        title: string;
        icon: string;
    }[];
    eligible_brands: {
        id: string;
        name: string;
        icon: string;
    }[];
    eligible_products: {
        id: string;
        name: string;
        thumbnail: string;
    }[];
}