"use client";

import Button from "@mui/material/Button";
import { useState } from "react";

import { EyeIcon } from "@/icons/eye";

import { ProductQuickView } from "./product-quick-view";

export const ProductQuickViewButton = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpen(true)}
                sx={{
                    border: 'none',
                }}>
                <EyeIcon />
            </Button>
            <ProductQuickView open={open} onClose={() => setOpen(false)} />
        </>
    );
};