"use client";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface TableToolbarSortingProps {
    options: { value: string; label: string }[];
}

export const TableToolbarSorting = ({ options }: TableToolbarSortingProps) => {
    return (
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
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}