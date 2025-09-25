"use client";

import { Box, FormControl } from "@mui/material";
import { Button } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { Link } from "next/link";

import { PlusIcon } from "@/icons/plus";

import { CategorySearchBox } from "./category-search-box";

const SORT_OPTIONS = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
];

export const CategoryTableToolbar = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" p={2} bgcolor="background.default">
            <CategorySearchBox />
            <Box display="flex" alignItems="center" gap={2}>
                <FormControl sx={{ width: 200 }}>
                    <Select
                        size="small"
                        displayEmpty
                        defaultValue=""
                        onChange={(value) => console.log(value)}
                    >
                        <MenuItem disabled value="">
                            <em>Sort by</em>
                        </MenuItem>
                        {SORT_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlusIcon />}
                    sx={{ height: 43 }}
                    component={Link}
                    href="/admin/categories/create"
                >
                    Add Category
                </Button>
            </Box>
        </Box>
    )
}