import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import { SearchIcon } from "@/icons/search";

interface MediaSearchBoxProps {
    searchText: string;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MediaSearchBox = ({ searchText, handleSearch }: MediaSearchBoxProps) => {
    return (
        <TextField
            value={searchText}
            onChange={handleSearch}
            placeholder="Search..."
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                },
            }}
            sx={{ width: { xs: 1, md: 260 } }}
        />
    );
};