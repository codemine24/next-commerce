"use client";

import { IconButton } from "@mui/material";

import { HeartEmptyIcon } from "@/icons/heart-empty";

export const AddWishListButton = () => {
    const handleAddWishList = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }
    return (
        <IconButton
            onClick={handleAddWishList}
            sx={{
                bgcolor: "background.paper",
                transform: "translateY(-10px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                "&:hover": {
                    bgcolor: "grey.100",
                },
            }}
        >
            <HeartEmptyIcon fontSize="small" />
        </IconButton>
    );
};