import { Prisma, User } from "@prisma/client";
import httpStatus from 'http-status';

import { AddressFieldsValidationConfig, addressSearchableFields } from "./address.constant";
import { TAddressPayload } from "./address.interface";
import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";

const createAddress = async (data: TAddressPayload, user: User) => {
    // Step 1: Unset previous default address if new one is marked as default for registered user
    if (data.is_default) {
        await prisma.address.updateMany({
            where: {
                user_id: user.id,
                is_default: true,
            },
            data: {
                is_default: false,
            },
        });
    }

    // Step 2: Create new address
    const result = await prisma.address.create({
        data: {
            user_id: user ? user.id : null,
            ...data,
        },
    });
    return result;
};

const getAddresses = async (query: Record<string, any>, user: User) => {
    const { page, limit, sort_by, sort_order, search_term } = query;

    if (sort_by)
        queryValidator(AddressFieldsValidationConfig, "sort_by", sort_by);
    if (sort_order)
        queryValidator(AddressFieldsValidationConfig, "sort_order", sort_order);

    const { pageNumber, limitNumber, skip, sortWith, sortSequence } = paginationMaker({
        page,
        limit,
        sort_by,
        sort_order,
    });

    const andConditions: Prisma.AddressWhereInput[] = [{ user_id: user.id }];

    if (search_term) {
        andConditions.push({
            OR: addressSearchableFields.map((field: string) => {
                return {
                    [field]: {
                        contains: search_term,
                        mode: "insensitive",
                    },
                };
            }),
        });
    }

    const whereConditions = {
        AND: andConditions,
    };

    const [result, total] = await Promise.all([
        prisma.address.findMany({
            where: whereConditions,
            skip: skip,
            take: limitNumber,
            orderBy: {
                [sortWith]: sortSequence,
            },
        }),
        await prisma.address.count({ where: whereConditions }),
    ]);

    return {
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
        },
        data: result,
    };
};

const updateAddress = async (id: string, payload: Partial<TAddressPayload>, user: User) => {
    // Step 1: Find the address by id
    const address = await prisma.address.findUniqueOrThrow({
        where: {
            id,
        },
    });

    // Step 2: Check if the address belongs to the user
    if (address.user_id !== user.id) {
        throw new CustomizedError(
            httpStatus.BAD_REQUEST,
            "You are not authorized to update this address"
        );
    }

    // Step 3: If address is marked as default, unset previous default addresses
    if (payload.is_default) {
        await prisma.address.updateMany({
            where: {
                user_id: user.id,
                is_default: true,
            },
            data: {
                is_default: false,
            },
        });
    }

    // Step 4: Update the address with provided payload
    const result = await prisma.address.update({
        where: {
            id,
        },
        data: payload,
    });

    return result;
}

const deleteAddresses = async ({ ids }: { ids: string[] }, user: User) => {
    const addresses = await prisma.address.findMany({
        where: {
            id: {
                in: ids,
            },
        },
    });

    if (addresses?.length === 0) {
        throw new CustomizedError(httpStatus.NOT_FOUND, "No address found to delete");
    }

    addresses.forEach((address) => {
        if (address.user_id !== user.id) {
            throw new CustomizedError(
                httpStatus.BAD_REQUEST,
                "You are not authorized to delete this address"
            );
        }
    });

    await prisma.address.deleteMany({
        where: {
            id: {
                in: ids,
            },
        },
    });

    return null;
};

export const AddressServices = {
    createAddress,
    getAddresses,
    updateAddress,
    deleteAddresses,
};