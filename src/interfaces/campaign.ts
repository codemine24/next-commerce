import { CampaignPlatform, CampaignStatus } from "@prisma/client";

export interface Campaign {
    id: string;
    slug: string;
    title: string;
    sub_title: string;
    description: string;
    thumbnail: string;
    start_at: string;
    end_at: string;
    platform: CampaignPlatform;
    conditions: string[];
    note: string;
    status: CampaignStatus;
    created_at: string;
    updated_at: string;
    eligible_brands: EligibleBrand[];
    eligible_categories: EligibleCategory[];
    eligible_products: EligibleProduct[];
}

export interface EligibleBrand {
    id: string;
    slug: string;
    name: string;
    icon: string;
}

export interface EligibleCategory {
    id: string;
    slug: string;
    title: string;
    icon: string;
}

export interface EligibleProduct {
    id: string;
    slug: string;
    name: string;
    thumbnail: string;
}