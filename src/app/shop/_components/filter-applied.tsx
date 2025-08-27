"use client";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useSearchParams, useRouter } from "next/navigation";
import { CloseIcon } from "@/icons/close";

export const FilterApplied = () => {
    const params = useSearchParams();
    const router = useRouter();

    const filters = Object.fromEntries(params.entries());

    const handleDelete = (keyToRemove: string) => {
        const newParams = new URLSearchParams(params.toString());
        newParams.delete(keyToRemove);

        const query = newParams.toString();
        const newUrl = query ? `?${query}` : window.location.pathname;

        router.push(newUrl);
    };

    return (
        <Stack direction="row" spacing={1}>
            {Object.entries(filters).map(([key, value]) => (
                <Chip
                    key={key}
                    label={`${key}: ${value}`}
                    color="primary"
                    variant="outlined"
                    onDelete={() => handleDelete(key)}
                    deleteIcon={<CloseIcon />}
                />
            ))}
        </Stack>
    );
};
