"use client";

import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Paginate, { PaginationProps } from "@mui/material/Pagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { ROW_PER_PAGE_OPTIONS } from "@/constants/common";

interface Props extends PaginationProps {
    page: number;
    total: number;
    limit: number;
    sx?: SxProps<Theme>;
}

export const Pagination = ({ page = 1, total, limit = 10, sx, ...others }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = React.useState(page);
    const totalPage = Math.ceil(total / limit);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", value.toString());
        router.replace(`?${params.toString()}`);
    };

    const handleLimitChange = (event: SelectChangeEvent<unknown>) => {
        setCurrentPage(1);
        const params = new URLSearchParams(searchParams.toString());
        params.set("limit", event.target.value as string);
        router.replace(`?${params.toString()}`);
    };

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={sx}
            >
                <Box display="flex" alignItems="center" gap={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="caption" color="text.secondary">Rows per page</Typography>
                        <Select
                            value={limit.toString()}
                            onChange={handleLimitChange}
                            slotProps={{
                                root: {
                                    sx: {
                                        height: 32,
                                        width: 70,
                                        borderRadius: 0,
                                        borderColor: "divider",
                                    },
                                },
                                input: {
                                    sx: {
                                        fontSize: 12,
                                    },
                                },
                            }}
                        >
                            {ROW_PER_PAGE_OPTIONS.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>

                    {totalPage > 1 && <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="caption" color="text.secondary">Go to</Typography>
                        <TextField
                            type="number"
                            variant="outlined"
                            size="small"
                            value={currentPage}
                            slotProps={{
                                root: {
                                    sx: {
                                        p: "0px !important",
                                        width: 60,
                                        borderRadius: 0,
                                        borderColor: "divider",
                                    },
                                },
                                input: {
                                    sx: {
                                        padding: 0,
                                        fontSize: 12,
                                        height: 31,
                                    },
                                },
                            }}
                            onChange={(event) => handleChange(event, parseInt(event.target.value, 10))}
                        />
                    </Box>}
                </Box>
                <Paginate
                    count={totalPage}
                    page={currentPage}
                    onChange={handleChange}
                    variant="outlined"
                    showFirstButton
                    showLastButton
                    {...others}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            height: "32px",
                            borderRadius: 0,
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                            color: "primary.contrastText",
                            backgroundColor: "primary.main",
                        },
                        "& .MuiPaginationItem-root:hover": {
                            backgroundColor: "primary.dark",
                        },
                    }}
                />
            </Box>
        </>
    );
}