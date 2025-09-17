"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { addProduct } from "@/actions/product/admin.product";
import { toast } from "@/lib/toast-store";
import { ProductSchema, productSchema } from "@/zod/product-schema";

import { ProductForm } from "./product-form";

export const ProductFormContainer = () => {
    const router = useRouter();
    const methods = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
    });

    const onSubmit = async (data: ProductSchema) => {
        const response = await addProduct(data);

        if (!response.success) {
            toast.error(response.message);
            return;
        }

        toast.success(response.message);
        router.replace("/admin/products");
    };

    return (
        <ProductForm methods={methods} onSubmit={onSubmit} />
    );
};