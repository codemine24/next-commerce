import CONFIG from "@/config";

export const makeImageUrl = (path?: string | null, bucket?: string): string => {
    if (!path) return "";
    return `${CONFIG.bucket_url}/${bucket || CONFIG.general_bucket}/${path}`;
};