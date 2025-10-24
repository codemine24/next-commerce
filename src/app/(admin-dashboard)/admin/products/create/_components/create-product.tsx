"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { addProduct } from "@/actions/product";
import { Brand } from "@/interfaces/brand";
import { Category } from "@/interfaces/category";
import { toast } from "@/lib/toast-store";
import { ProductSchema, productSchema } from "@/zod/product-schema";

import { ProductForm } from "../../_components/product-form";

interface CreateProductProps {
    brands: Brand[];
    categories: Category[];
}

export const CreateProduct = ({ brands, categories }: CreateProductProps) => {
    const router = useRouter();
    const methods = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            model: "",
            categories: undefined,
            brand_id: undefined,
            size: "",
            color: "",
            tags: [],
            product_code: "",
            warranty: "",
            stock: undefined,
            price: undefined,
            discount_price: undefined,
            thumbnail: "",
            gallery: [],
            description: "",
            specification: "",
            additional_information: "",
            key_features: [],
            video_url: undefined,
        },
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
        <ProductForm
            methods={methods}
            onSubmit={onSubmit}
            brands={brands}
            categories={categories}
        />
    );
};