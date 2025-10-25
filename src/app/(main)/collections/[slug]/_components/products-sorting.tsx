"use client";

import { Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { PRODUCT_SORT } from "@/constants/product";
import { Meta } from "@/interfaces/api";

export const ProductsSorting = ({ meta }: { meta: Meta }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [sort, setSort] = useState("default");

    // Set initial state
    useEffect(() => {
        const sortBy = searchParams.get("sort_by");
        const sortOrder = searchParams.get("sort_order");

        let resolvedSort = "default";

        if (sortBy && sortOrder) {
            resolvedSort = `${sortBy}-${sortOrder}`;
        }

        setSort(resolvedSort);
    }, [searchParams]);


    // Update query params
    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value;
        setSort(newValue);

        const params = new URLSearchParams(searchParams.toString());

        if (newValue === "default") {
            params.delete("sort_by");
            params.delete("sort_order");
        } else {
            const [sortBy, sortOrder] = newValue.split("-");
            params.set("sort_by", sortBy);
            params.set("sort_order", sortOrder);
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Box
            p={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            border={1}
            borderColor="divider"
            mb={2}
        >
            <Typography variant="subtitle1">Showing {meta.page * meta.limit > meta.total ? meta.total : meta.page * meta.limit} of {meta.total} products</Typography>

            <Box>
                <Select
                    value={sort}
                    onChange={(e) => handleChange(e)}
                    slotProps={{
                        root: {
                            sx: {
                                height: 32,
                                width: 180,
                                borderRadius: 0,
                                borderColor: "divider",
                            },
                        },
                    }}
                >
                    {PRODUCT_SORT.map((sort) => (
                        <MenuItem key={sort.value} value={sort.value}>
                            {sort.label}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
        </Box>
    );
};