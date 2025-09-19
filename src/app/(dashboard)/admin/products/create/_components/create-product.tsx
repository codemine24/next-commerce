"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { addProduct } from "@/actions/product";
import { Brand } from "@/interfaces/brand";
import { toast } from "@/lib/toast-store";
import { ProductSchema, productSchema } from "@/zod/product-schema";

import { ProductForm } from "../../_components/product-form";

export const CreateProduct = ({ brands }: { brands: Brand[] }) => {
    const router = useRouter();
    const methods = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            model: "",
            brand_id: "",
            size: "",
            color: "",
            tags: [],
            product_code: "",
            warranty: "",
            stock: undefined,
            price: undefined,
            discount_price: undefined,
            thumbnail: "dailydev_where_developers_suffer_together_sfvfog.webp",
            gallery: ["early_evening_by_kvacm_de83bzk.jpg"],
            description: "",
            specification: "",
            additional_information: "",
            key_features: [],
            video_url: undefined,
        },
    });

    const onSubmit = async (data: ProductSchema) => {
        const payload = {
            ...data,
            brand_id: data.brand_id || undefined,
        }
        const response = await addProduct(payload);

        if (!response.success) {
            toast.error(response.message);
            return;
        }

        toast.success(response.message);
        router.replace("/admin/products");
    };

    return (
        <ProductForm methods={methods} onSubmit={onSubmit} brands={brands} />
    );
};