"use server";

import { SearchParams } from "@/interfaces/common";
import { CampaignSchema } from "@/zod/campaign-schema";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { makeQueryParams } from "@/utils/helper";
import { TAGS } from "@/constants/tags";
import { revalidateTag } from "next/cache";

export const getCampaigns = async (queries?: SearchParams) => {
    let url = API_ROUTES.campaigns.get_campaigns;

    if (queries && Object.keys(queries).length > 0) {
        const queryParams = makeQueryParams(queries);
        url += `?${queryParams}`;
    }

    const res = await api.get(url, { next: { tags: [TAGS.campaigns] } });
    return res;
}

export const createCampaign = async (data: CampaignSchema) => {
    const payload = {
        ...data,
        eligible_categories: data.eligible_categories?.map((item) => item.value),
        eligible_brands: data.eligible_brands?.map((item) => item.value),
        eligible_products: data.eligible_products?.map((item) => item.value),
    };
    const res = await api.post(API_ROUTES.campaigns.create_campaign, {
        body: JSON.stringify(payload),
    });

    if (res.success) revalidateTag(TAGS.campaigns);
    return res;
}

export const updateCampaign = async (id: string, data: CampaignSchema) => {
    const res = await api.put(API_ROUTES.campaigns.update_campaign(id), {
        body: JSON.stringify(data),
    });

    if (res.success) revalidateTag(TAGS.campaigns);
    return res;
}

export const deleteCampaign = async (ids: string[]) => {
    const res = await api.delete(API_ROUTES.campaigns.delete_campaign, {
        body: JSON.stringify({ ids }),
    });

    if (res.success) revalidateTag(TAGS.campaigns);
    return res;
}