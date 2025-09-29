"use client";

import { ButtonProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

import { PlusIcon } from "@/icons/plus";

import { TableToolbarSearchBox } from "./table-toolbar-search-box";
import { TableToolbarSorting } from "./table-toolbar-sorting";

const SORT_OPTIONS = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
];

interface TableToolbarProps {
    href: string;
    addButtonText: string;
    buttonProps?: ButtonProps;
}

export const TableToolbar = ({ href, addButtonText, buttonProps }: TableToolbarProps) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" p={2} bgcolor="background.default">
            <TableToolbarSearchBox />
            <Box display="flex" alignItems="center" gap={2}>
                <TableToolbarSorting options={SORT_OPTIONS} />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlusIcon />}
                    sx={{ height: 43 }}
                    component={Link}
                    href={href}
                    {...buttonProps}
                >
                    {addButtonText}
                </Button>
            </Box>
        </Box>
    )
}