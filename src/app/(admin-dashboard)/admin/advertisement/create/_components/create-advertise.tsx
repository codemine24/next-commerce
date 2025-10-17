"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BannerType } from "@prisma/client";
import { useForm } from "react-hook-form";

import { createAdvertise } from "@/actions/banner";
import { toast } from "@/lib/toast-store";
import { advertiseSchema, AdvertiseSchema } from "@/zod/advertise-schema";

import { AdvertiseForm } from "../../_components/advertise-form";

export const CreateAdvertise = () => {
    const methods = useForm<AdvertiseSchema>({
        resolver: zodResolver(advertiseSchema),
        defaultValues: {
            image: "",
            type: BannerType.BANNER,
            name: "",
            title: "",
            sub_title: "",
            button_text: "",
            url: undefined,
        },
    });

    const onSubmit = async (data: AdvertiseSchema) => {
        const res = await createAdvertise(data);
        if (res.success) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    return <AdvertiseForm methods={methods} onSubmit={onSubmit} />
}