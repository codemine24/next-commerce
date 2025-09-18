"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { addBrand } from "@/actions/brand";
import { toast } from "@/lib/toast-store";
import { brandSchema, BrandSchema } from "@/zod/brand-schema";

import { BrandForm } from "../../_components/brand-form";

export const CreateBrand = () => {
    const router = useRouter();
    const methods = useForm<BrandSchema>({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            name: "",
            code: "",
            description: "",
            icon: "",
        },
    });

    const onSubmit = async (data: BrandSchema) => {
        const res = await addBrand(data);

        if (!res.success) {
            return toast.error(res.message);
        }

        toast.success(res.message);
        router.replace("/admin/brands");
    }
    return (
        <BrandForm onSubmit={onSubmit} methods={methods} />
    )
}