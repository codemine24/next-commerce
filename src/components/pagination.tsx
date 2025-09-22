"use client";

import Box from "@mui/material/Box";
import Paginate from "@mui/material/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface PaginationProps {
    page: number;
    total: number;
    limit: number;
}

export const Pagination = ({ page, total, limit }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = React.useState(page || 1);
    const totalPage = Math.ceil(total / limit);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", value.toString());
        router.replace(`${window.location.pathname}?${params.toString()}`);
    };

    return (
        <>
            <Box
                mt={4}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
            >
                <Paginate
                    count={totalPage}
                    page={currentPage}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                        "& .MuiPaginationItem-root": {
                            height: "32px",
                            borderRadius: 0,
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                            color: "primary.contrastText",
                            backgroundColor: "primary.main",
                        },
                    }}
                />
            </Box>
        </>
    );
}