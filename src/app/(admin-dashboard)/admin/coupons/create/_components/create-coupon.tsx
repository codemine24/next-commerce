"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { createCoupon } from "@/actions/coupon";
import { Brand } from "@/interfaces/brand";
import { Category } from "@/interfaces/category";
import { Product } from "@/interfaces/product";
import { toast } from "@/lib/toast-store";
import { CouponSchema, couponSchema } from "@/zod/coupon-schema";

import { CouponForm } from "../../_components/coupon-form";


interface CreateCouponProps {
    brands: Brand[];
    categories: Category[];
    products: Product[];
}

export const CreateCoupon = ({ brands, categories, products }: CreateCouponProps) => {
    const router = useRouter();

    const methods = useForm<CouponSchema>({
        resolver: zodResolver(couponSchema),
        defaultValues: {
            code: "",
            discount_type: undefined,
            discount_value: undefined,
            maximum_value: undefined,
            start_date: "",
            expiration_date: "",
            usage_limit: undefined,
            per_user_limit: undefined,
            min_order_amount: undefined,
            beneficiary_type: undefined,
            eligible_categories: [],
            eligible_brands: [],
            eligible_products: [],
        },
    });

    const onSubmit = async (data: CouponSchema) => {
        const res = await createCoupon(data);
        if (!res.success) {
            toast.error(res.message);
            return;
        }
        toast.success(res.message);
        router.replace("/admin/coupons");
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
}