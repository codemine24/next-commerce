"use client";

import { InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import { inputClasses } from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";
import { CloseIcon } from "@/icons/close";
import { SearchIcon } from "@/icons/search";
import { BORDER_RADIUS } from "@/theme";

import { SearchResultPreview } from "./search-result-preview";

export const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResult, setShowResult] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearch.length >= 2) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }, [debouncedSearch]);

  return (
    <Box flex={1} height="100%" px={2}>
      <TextField
        placeholder="Search products..."
        size="small"
        variant="standard"
        value={searchQuery}
        fullWidth
        onChange={(e) => setSearchQuery(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  fontSize="medium"
                  sx={{ mb: 0.5, mr: 0.5, color: "text.secondary" }}
                />
              </InputAdornment>
            ),
            endAdornment:
              searchQuery.length > 0 ? (
                <InputAdornment position="end">
                  <CloseIcon
                    onClick={() => setSearchQuery("")}
                    fontSize="medium"
                    sx={{
                      mb: 0.5,
                      mr: 0.5,
                      cursor: "pointer",
                      color: "text.secondary",
                    }}
                  />
                </InputAdornment>
              ) : null,
          },
        }}
        sx={{
          [`& .${inputClasses.root}`]: {
            py: 0.5,
            px: 1,
            height: "100%",
            mt: 0.3,
          },
          [`& .${inputClasses.root}:before`]: {
            borderBottom: "none",
          },
          [`& .${inputClasses.root}:after`]: {
            borderBottom: "none",
          },
          [`& .${inputClasses.root}::placeholder`]: {
            fontSize: "3.875rem",
            opacity: 1,
          },
          [`& .${inputClasses.root}:hover:not(.Mui-disabled):before`]: {
            borderBottom: "none",
          },
          border: 1,
          borderColor: "divider",
          borderRadius: BORDER_RADIUS.default,
          label: {
            color: "yellow",
          },
          input: {
            color: "text.secondary",
            fontSize: ".875rem",
          },
        }}
      />
      {showResult && (
        <SearchResultPreview
          searchTerm={debouncedSearch}
          setShowResult={setShowResult}
        />
      )}
    </Box>
  );
};