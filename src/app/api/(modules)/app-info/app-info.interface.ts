import { Document } from "mongoose";

export interface AppInfo extends Document {
  name: string;
  logo: string;
  secondary_logo?: string;
  title: string;
  primary_color: string;
  secondary_color?: string;
  favicon?: string;
}

export interface AppInfoPayload {
  name: string;
  logo: string;
  secondary_logo?: string;
  title: string;
  primary_color: string;
  secondary_color?: string;
}
