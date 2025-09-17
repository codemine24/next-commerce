import { CampaignPlatform, CampaignStatus } from "@prisma/client";
import { SORT_ORDER_VALUE } from "../../(helpers)/constants/common";

export function getCampaignStatus(
  startDate: Date,
  endDate: Date
): CampaignStatus {
  const now = new Date();

  if (now < startDate) {
    return "UPCOMING";
  }
  if (now >= startDate && now <= endDate) {
    return "ACTIVE";
  }
  return "CLOSED";
}

export const campaignSortableFields = [
  "title",
  "sub_title",
  "created_at",
  "updated_at",
  "start_at",
  "end_at",
];

export const campaignSearchableFields = ["title", "sub_title"];

export const campaignFilterableFields = [
  "platform",
  "status",
  "start_at",
  "end_at",
  "searchTerm",
  "page",
  "limit",
  "sortBy",
  "sortOrder",
];

export const campaignQueryValidationConfig: Record<string, any> = {
  platform: Object.values(CampaignPlatform),
  status: Object.values(CampaignStatus),
  sort_by: campaignSortableFields,
  sort_order: SORT_ORDER_VALUE,
};
