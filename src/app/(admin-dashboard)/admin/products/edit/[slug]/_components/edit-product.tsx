"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { editProduct } from "@/actions/product";
import { Brand } from "@/interfaces/brand";
import { Product } from "@/interfaces/product";
import { toast } from "@/lib/toast-store";
import { ProductSchema, productSchema } from "@/zod/product-schema";

import { ProductForm } from "../../../_components/product-form";

interface EditProductProps {
    brands: Brand[];
    product: Product;
}

export const EditProduct = ({ brands, product }: EditProductProps) => {
    const router = useRouter();
    const methods = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product.name,
            model: product.model || '',
            brand_id: product.brand_id || '',
            size: product.size || '',
            color: product.color || '',
            tags: product.tags,
            product_code: product.product_code || '',
            warranty: product.warranty || '',
            stock: product.stock || undefined,
            price: product.price || undefined,
            discount_price: product.discount_price || undefined,
            thumbnail: product.thumbnail || '',
            gallery: product.gallery || [],
            description: product.description || '',
            specification: product.specification || '',
            additional_information: product.additional_information || '',
            key_features: product.key_features || [],
            video_url: product.video_url || undefined,
        },
    });

    const onSubmit = async (data: ProductSchema) => {
        const payload = {
            ...data,
            brand_id: data.brand_id || undefined,
        }
        const response = await editProduct(product.slug, payload);

        if (!response.success) {
            toast.error(response.message);
            return;
        }

        toast.success(response.message);
        router.back();
    };

    return (
        <ProductForm methods={methods} onSubmit={onSubmit} brands={brands} />
    );
};