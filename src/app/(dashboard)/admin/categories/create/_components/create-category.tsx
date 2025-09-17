"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { addCategory } from "@/actions/category";
import { Category } from "@/interfaces/category";
import { toast } from "@/lib/toast-store";
import { categorySchema, CategorySchema } from "@/zod/category-schema";

import { CategoryForm } from "../../_components/category-form";

export const CreateCategory = ({ categories }: { categories: Category[] }) => {
    const router = useRouter();
    const methods = useForm<CategorySchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            title: "",
            code: "",
            description: "",
            parent_id: "",
            icon: "",
        },
    });

    const onSubmit = async (data: CategorySchema) => {
        const payload = {
            ...data,
            parent_id: data.parent_id || undefined,
        };

        const res = await addCategory(payload);

        if (!res.success) {
            toast.error(res.message);
            return;
        }

        toast.success(res.message);
        router.push("/admin/categories");
    };

    return (
        <CategoryForm methods={methods} onSubmit={onSubmit} categories={categories} />
    );
};