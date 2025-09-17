import { CampaignPlatform } from "@prisma/client";

export type CampaignPayload = {
  title: string;
  sub_title?: string;
  description?: string;
  thumbnail: string;
  start_at: string;
  end_at: string;
  platform?: CampaignPlatform;
  conditions?: string[];
  note?: string;
  eligible_categories?: string[];
  eligible_brands?: string[];
  eligible_products?: string[];
};
