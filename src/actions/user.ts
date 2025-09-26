"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/constants/tags";
import { SearchParams } from "@/interfaces/common";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { makeQueryParams } from "@/utils/helper";
import { SignupSchemaType } from "@/zod/signup-schema";


export const getUsers = async (query?: SearchParams) => {
    let url = API_ROUTES.users.get_users;

    if (query && Object.keys(query).length > 0) {
        const queryParams = makeQueryParams(query);
        url += `?${queryParams}`;
    }

    const res = await api.get(url, {
        next: { tags: [TAGS.users] }
    });
    return res;
}

export const createUser = async (user: SignupSchemaType) => {
    const res = await api.post(API_ROUTES.users.create_user, {
        body: JSON.stringify(user),
    });

    if (res.success) revalidateTag(TAGS.users);

    return res;
}