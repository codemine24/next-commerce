"use client";

import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import { useState, useRef } from "react";

import { MEDIA_FILTER_OPTIONS } from "@/constants/common";
import { ChevronDownIcon } from "@/icons/chevron-down";

interface MediaFileTypeProps {
    types: string[];
    handleFilterType: (type: string) => void;
    handleResetType: () => void;
}

export const MediaFileType = ({ types, handleFilterType, handleResetType }: MediaFileTypeProps) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement | null>(null);

    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                color="inherit"
                onClick={() => setOpen(true)}
                ref={anchorRef}
                sx={{ gap: 1 }}
                endIcon={
                    <Box display="flex" alignItems="center" gap={1}>
                        {types.length > 0 && <Box
                            sx={{
                                height: 24,
                                width: 24,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 14,
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                color: (theme) => theme.palette.primary.main,
                            }}>
                            +{types.length}
                        </Box>}
                        <ChevronDownIcon />
                    </Box>
                }
            >
                File Type
            </Button>

            <Popover
                open={open}
                anchorEl={anchorRef.current}
                onClose={handleClose}
                slotProps={{ paper: { sx: { p: 2.5 } } }}
            >
                <Stack spacing={2.5}>
                    <Box
                        gap={1}
                        display="grid"
                        gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }}
                    >
                        {MEDIA_FILTER_OPTIONS.map((type) => {
                            const selected = types.includes(type);

                            return (
                                <CardActionArea
                                    key={type}
                                    onClick={() => handleFilterType(type)}
                                    sx={{
                                        p: 1,
                                        borderRadius: 1,
                                        cursor: 'pointer',
                                        border: 1,
                                        borderColor: 'divider',
                                        ...(selected && { bgcolor: "primary.main", color: "primary.contrastText" }),
                                    }}
                                >
                                    <Stack
                                        spacing={1}
                                        direction="row"
                                        alignItems="center"
                                        sx={{
                                            typography: 'caption',
                                            fontWeight: 500,
                                            textTransform: 'capitalize',
                                            ...(selected && { fontWeight: 'fontWeightSemiBold' }),
                                        }}
                                    >
                                        {type}
                                    </Stack>
                                </CardActionArea>
                            );
                        })}
                    </Box>

                    <Stack spacing={1.5} direction="row" alignItems="center" justifyContent="flex-end">
                        <Button variant="outlined" onClick={handleResetType}>
                            Clear All
                        </Button>
                    </Stack>
                </Stack>
            </Popover>
        </>
    );
};