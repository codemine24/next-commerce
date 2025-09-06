"use client";

import Button from "@mui/material/Button";
import { EyeIcon } from "@/icons/eye";
import { ProductQuickView } from "./product-quick-view";
import { useState } from "react";

export const ProductQuickViewButton = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button variant="soft" onClick={() => setOpen(true)}><EyeIcon /></Button>
            <ProductQuickView open={open} onClose={() => setOpen(false)} />
        </>
    );
};