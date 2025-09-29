"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { updateCoupon } from "@/actions/coupon";
import { Brand } from "@/interfaces/brand";
import { Category } from "@/interfaces/category";
import { Coupon } from "@/interfaces/coupon";
import { Product } from "@/interfaces/product";
import { toast } from "@/lib/toast-store";
import { CouponSchema, couponSchema } from "@/zod/coupon-schema";

import { CouponForm } from "../../../_components/coupon-form";

interface EditCouponProps {
    brands: Brand[];
    coupon: Coupon;
    categories: Category[];
    products: Product[];
}

export const EditCoupon = ({ brands, coupon, categories, products }: EditCouponProps) => {
    const router = useRouter();
    const methods = useForm<CouponSchema>({
        resolver: zodResolver(couponSchema),
        defaultValues: {
            code: coupon.code,
            discount_type: coupon.discount_type,
            discount_value: coupon.discount_value || undefined,
            start_date: coupon.start_date || undefined,
            expiration_date: coupon.expiration_date || undefined,
            maximum_value: coupon.maximum_value || undefined,
            usage_limit: coupon.usage_limit || undefined,
            per_user_limit: coupon.per_user_limit || undefined,
            min_order_amount: coupon.min_order_amount || undefined,
            beneficiary_type: coupon.beneficiary_type || undefined,
            eligible_categories: coupon.eligible_categories?.map((category) => ({ label: category.title, value: category.id })) || [],
            eligible_brands: coupon.eligible_brands?.map((brand) => ({ label: brand.name, value: brand.id })) || [],
            eligible_products: coupon.eligible_products?.map((product) => ({ label: product.name, value: product.id })) || [],
        },
    });

    const onSubmit = async (data: CouponSchema) => {
        const response = await updateCoupon(coupon.id, data);

        if (!response.success) {
            toast.error(response.message);
            return;
        }

        toast.success(response.message);
        router.back();
    };

    return (
        <CouponForm
            methods={methods}
            onSubmit={onSubmit}
            brands={brands}
            categories={categories}
            products={products}
        />
    );
};