"use client";

import { styled } from "@mui/material/styles";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import type { SxProps, Theme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import "overlayscrollbars/overlayscrollbars.css";

interface ScrollbarProps extends PropsWithChildren {
    className?: string;
    sx?: SxProps<Theme>;
}

// Apply CSS variables directly
const StyledScrollbar = styled(OverlayScrollbarsComponent)({
    height: "100%",
    ".os-theme-dark": {
        "--os-size": "9px",
        "--os-handle-bg": "rgba(255, 255, 255, 0.4)",
    }
});

export const OverlayScrollbar = ({ sx, children, className }: ScrollbarProps) => {
    return (
        <StyledScrollbar
            defer
            sx={sx}
            className={className}
            options={{ scrollbars: { autoHide: "leave", autoHideDelay: 100 } }}
        >
            {children}
        </StyledScrollbar>
    );
}
