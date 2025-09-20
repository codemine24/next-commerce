"use client";

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
                endIcon={<ChevronDownIcon />}
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
                                        border: 'solid 1px',
                                        ...(selected && { bgcolor: 'action.selected' }),
                                    }}
                                >
                                    <Stack
                                        spacing={1}
                                        direction="row"
                                        alignItems="center"
                                        sx={{
                                            typography: 'caption',
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
                        <Button variant="outlined" color="inherit" onClick={handleResetType}>
                            Clear
                        </Button>

                        <Button variant="contained" onClick={handleClose}>
                            Apply
                        </Button>
                    </Stack>
                </Stack>
            </Popover>
        </>
    );
};