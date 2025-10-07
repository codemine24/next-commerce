import CONFIG from "@/config";
import { SearchParams } from "@/interfaces/common";

export const makeImageUrl = (path?: string | null, bucket?: string): string => {
    if (!path) return "";
    // return `${CONFIG.bucket_url}/${bucket || CONFIG.general_bucket}/${path}`;
    return `${CONFIG.bucket_url}${path}`;
};

export const makeQueryParams = (params: SearchParams): string => {
    const queriesString = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
    return queriesString;
};