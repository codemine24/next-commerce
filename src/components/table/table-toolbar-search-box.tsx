"use client";

import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

import { useDebounce } from "@/hooks/use-debounce";
import { CloseIcon } from "@/icons/close";
import { SearchIcon } from "@/icons/search";

export const TableToolbarSearchBox = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchText, setSearchText] = useState("");

    const doSearch = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());
        const current = params.get("search_term") || "";

        if (searchText) {
            if (current !== searchText) {
                params.set("search_term", searchText);
                router.replace(`?${params.toString()}`);
            }
        } else if (current) {
            params.delete("search_term");
            router.replace(`?${params.toString()}`);
        }
    }, [searchParams, router, searchText]);

    const debouncedSearchText = useDebounce(searchText, 500);

    useEffect(() => {
        doSearch();
    }, [debouncedSearchText, doSearch]);

    const handleClearSearch = () => {
        setSearchText("");
        doSearch();
    };

    return (
        <Box>
            <TextField
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
                size="small"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: searchText && (
                            <InputAdornment position="end">
                                <CloseIcon onClick={handleClearSearch} cursor="pointer" />
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{ width: { xs: 1, md: 260 } }}
            />
        </Box>
    );
};