"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
import { SearchParams } from "@/interfaces/common";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";

export const getFiles = async (queries: SearchParams) => {
    let url = API_ROUTES.files.get_files;
    const queriesString = Object.entries(queries)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

    if (queriesString) url += `?${queriesString}`;

    const res = await api.get(url, {
        next: { tags: [TAGS.files] }
    });
    return res;
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
