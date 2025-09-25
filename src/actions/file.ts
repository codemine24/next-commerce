"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
import { SearchParams } from "@/interfaces/common";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { makeQueryParams } from "@/utils/helper";

export const getFiles = async (queries: SearchParams) => {
    let url = API_ROUTES.files.get_files;

    if (Object.keys(queries).length > 0) {
        const queryParams = makeQueryParams(queries);
        url += `?${queryParams}`;
    }

    const res = await api.get(url, { next: { tags: [TAGS.files] } });
    return res;
}

export async function updateMediaFilters(formData: FormData) {
    const searchParams = new URLSearchParams();

    // Add all filter values to URLSearchParams
    const filters = {
        search_term: formData.get("search_term"),
        fromDate: formData.get("fromDate"),
        toDate: formData.get("toDate"),
        type: formData.get("type"),
    };

    Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "") {
            searchParams.set(key, value.toString());
        }
    });

    // Revalidate the page with new params
    revalidatePath(`/media?${searchParams.toString()}`);
}

export const uploadFiles = async (formData: FormData) => {
    const res = await api.post(API_ROUTES.files.upload_files,
        {
            body: formData,
            next: { tags: [TAGS.files] }
        });

    if (res.success) revalidateTag(TAGS.files);

    return res;
};

export const deleteFiles = async (ids: string[]) => {
    const res = await api.delete(API_ROUTES.files.delete_files, {
        body: JSON.stringify({ files_path: ids }),
        next: { tags: [TAGS.files] }
    });

    if (res.success) revalidateTag(TAGS.files);
    return res;
};
