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
                bgcolor: "primary.light",
                transform: "translateY(-10px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                color: "primary.contrastText",
                "&:hover": {
                    bgcolor: "primary.light",
                },
            }}
        >
            <HeartEmptyIcon fontSize="small" />
        </IconButton>
    );
};