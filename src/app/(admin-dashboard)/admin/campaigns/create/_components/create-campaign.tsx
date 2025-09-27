"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";

import { Brand } from "@/interfaces/brand";
import { Category } from "@/interfaces/category";
import { Product } from "@/interfaces/product";
import { campaignSchema, CampaignSchema } from "@/zod/campaign-schema";

import { CampaignForm } from "../../_components/campaign-form";
import { createCampaign } from "@/actions/campaign";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast-store";

interface CreateCampaignProps {
    products: Product[];
    brands: Brand[];
    categories: Category[];
}

export const CreateCampaign = ({ products, brands, categories }: CreateCampaignProps) => {
    const router = useRouter();
    const methods = useForm<CampaignSchema>({
        resolver: zodResolver(campaignSchema),
        defaultValues: {
            title: "",
            sub_title: "",
            description: "",
            thumbnail: "",
            start_at: new Date().toISOString().split("T")[0],
            end_at: new Date().toISOString().split("T")[0],
            platform: "ALL",
            conditions: [],
            note: "",
            eligible_categories: [],
            eligible_brands: [],
            eligible_products: [],
        }
    });

    // console.log(methods.formState.errors)
    // console.log(methods.getValues())

    const onSubmit = async (data: CampaignSchema) => {
        const res = await createCampaign(data);

        if (!res.success) {
            toast.error(res.message);
            return;
        }

        toast.success(res.message);
        router.replace("/admin/campaigns");
    };

    return (
        <Box pb={10}>
            <Typography variant="h4" sx={{ my: 4 }}>Create Campaign</Typography>
            <CampaignForm methods={methods} onSubmit={onSubmit} products={products} brands={brands} categories={categories} />
        </Box>
    );
};
