"use client";

import IconButton from "@mui/material/IconButton";
import { SxProps, Theme } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import Link from "next/link";
import React from "react";

interface SoftIconButtonProps {
    children: React.ReactNode;
    color?: string;
    sx?: SxProps<Theme>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    href?: string;
    target?: string;
    rel?: string;
}

export const SoftIconButton = ({
    children,
    color = "primary",
    sx,
    onClick,
    href,
    target,
    rel,
}: SoftIconButtonProps) => {
    const theme = useTheme();

    const isThemeColor = theme.palette[color as keyof typeof theme.palette]?.main !== undefined;
    const colorMain = isThemeColor
        ? theme.palette[color as keyof typeof theme.palette].main
        : color;

    const softBg = alpha(colorMain, 0.12);
    const hoverBg = alpha(colorMain, 0.2);

    const commonStyles: SxProps<Theme> = {
        backgroundColor: softBg,
        color: colorMain,
        border: "1px solid",
        borderColor: colorMain,
        fontWeight: 600,
        borderRadius: "10px",
        p: 1,
        minWidth: "auto",
        textTransform: "capitalize",
        "&:hover": {
            backgroundColor: hoverBg,
            opacity: 1,
        },
        ...sx,
    };

    if (href) {
        return (
            <IconButton
                component={Link}
                href={href}
                sx={commonStyles}
                target={target}
                rel={rel}
            >
                {children}
            </IconButton>
        );
    }

    return (
        <IconButton sx={commonStyles} onClick={onClick}>
            {children}
        </IconButton>
    );
};
