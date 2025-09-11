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
                bgcolor: "primary.light",
                transform: "translateY(-10px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                color: "primary.contrastText",
                "&:hover": {
                    bgcolor: "primary.light",
                },
            }}
        >
            <CartIcon fontSize="small" />
        </IconButton>
    );
};