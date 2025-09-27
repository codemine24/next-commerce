"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { updateCampaign } from "@/actions/campaign";
import { Brand } from "@/interfaces/brand";
import { Campaign } from "@/interfaces/campaign";
import { Category } from "@/interfaces/category";
import { Product } from "@/interfaces/product";
import { toast } from "@/lib/toast-store";
import { campaignSchema, CampaignSchema } from "@/zod/campaign-schema";

import { CampaignForm } from "../../../_components/campaign-form";

interface EditCampaignProps {
    products: Product[];
    brands: Brand[];
    categories: Category[];
    campaign: Campaign;
}

export const EditCampaign = ({ products, brands, categories, campaign }: EditCampaignProps) => {
    const router = useRouter();
    const methods = useForm<CampaignSchema>({
        resolver: zodResolver(campaignSchema),
        defaultValues: {
            title: campaign.title,
            sub_title: campaign.sub_title,
            description: campaign.description,
            thumbnail: campaign.thumbnail,
            start_at: campaign.start_at,
            end_at: campaign.end_at,
            platform: campaign.platform,
            conditions: campaign.conditions,
            note: campaign.note,
            eligible_categories: campaign.eligible_categories?.map((item) => ({ label: item.title, value: item.id })),
            eligible_brands: campaign.eligible_brands?.map((item) => ({ label: item.name, value: item.id })),
            eligible_products: campaign.eligible_products?.map((item) => ({ label: item.name, value: item.id })),
        }
    });

    const onSubmit = async (data: CampaignSchema) => {
        const res = await updateCampaign(campaign.id, data);

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