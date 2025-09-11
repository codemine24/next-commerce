"use client";

import { IconButton } from "@mui/material";

import { CartIcon } from "@/icons/cart-icon";

export const AddToCartIconButton = () => {
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }
    return (
        <IconButton
            onClick={handleAddToCart}
            sx={{
                bgcolor: "background.paper",
                transform: "translateY(-10px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                "&:hover": {
                    bgcolor: "grey.100",
                },
            }}
        >
            <CartIcon fontSize="small" />
        </IconButton>
    );
};