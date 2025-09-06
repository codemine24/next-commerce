"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { inputClasses } from "@mui/material/Input";
import { useState } from "react";
import { InputAdornment } from "@mui/material";
import { SearchIcon } from "@/icons/search";
import { CloseIcon } from "@/icons/close";

export const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <Box
            flex={1}
            height="100%"
            px={2}
            borderLeft="1px solid"
            borderRight="1px solid"
            borderColor="divider"
        >
            <TextField
                placeholder="Search..."
                size="small"
                variant="standard"
                value={searchQuery}
                fullWidth
                onChange={(e) => setSearchQuery(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="medium" sx={{ mb: 0.5, mr: 0.5 }} />
                            </InputAdornment>
                        ),
                        endAdornment: searchQuery.length > 0 ? (
                            <InputAdornment position="end">
                                <CloseIcon
                                    onClick={() => setSearchQuery("")}
                                    fontSize="medium"
                                    sx={{ mb: 0.5, mr: 0.5, cursor: "pointer" }}
                                />
                            </InputAdornment>
                        ) : null,
                    },
                }}
                sx={{
                    [`& .${inputClasses.root}`]: {
                        pt: 1,
                        height: "100%",
                    },
                    [`& .${inputClasses.root}:before`]: {
                        borderBottom: "none",
                    },
                    [`& .${inputClasses.root}:after`]: {
                        borderBottom: "none",
                    },
                    [`& .${inputClasses.root}:hover:not(.Mui-disabled):before`]: {
                        borderBottom: "none",
                    },
                }}
            />
        </Box>
    );
};
