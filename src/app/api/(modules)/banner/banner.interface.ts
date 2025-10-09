import { BannerType } from "@prisma/client";

export interface BannerPayload {
  type: BannerType;
  name: string;
  image: string;
  title?: string;
  sub_title?: string;
  button_text?: string;
  url?: string;
}
