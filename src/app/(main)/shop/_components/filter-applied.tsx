"use client";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useSearchParams, useRouter } from "next/navigation";
import { CloseIcon } from "@/icons/close";
import { alpha, Box, Typography } from "@mui/material";

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

    const appliedFilters = Object.entries(filters)

    return (
        <>
            {appliedFilters.length > 0 && (
                <Box
                    p={2}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    flexWrap="wrap"
                    mb={3}
                    border={1}
                    borderColor="divider"
                >
                    <Typography variant="h5">Applied Filter:</Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {appliedFilters.map(([key, value]) => (
                            <Chip
                                key={key}
                                label={`${key}: ${value}`}
                                color="primary"
                                variant="filled"
                                onDelete={() => handleDelete(key)}
                                deleteIcon={<CloseIcon sx={{ color: "#007B54 !important" }} />}
                                sx={{
                                    borderRadius: 0,
                                    color: "primary.main",
                                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08)
                                }}
                            />
                        ))}
                    </Stack>
                </Box>
            )}
        </>
    );
};