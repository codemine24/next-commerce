"use client";

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Popover from "@mui/material/Popover"
import React from "react"

import { DotVerticalIcon } from "@/icons/dot-vertical"
import { EyeIcon } from "@/icons/eye";
import { LinkIcon } from "@/icons/link";
import { Media } from "@/interfaces/media";
import { toast } from "@/lib/toast-store";
import { makeImageUrl } from "@/utils/helper";

interface MediaActionPopoverProps {
    media: Media;
    onView?: (media: Media) => void;
}

export const MediaActionPopover = ({ media, onView }: MediaActionPopoverProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleView = () => {
        onView?.(media);
        handleClose();
    };

    const handleCopyLink = () => {
        try {
            const link = makeImageUrl(media.path);
            navigator.clipboard.writeText(link);
            toast.success("Link copied to clipboard");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Failed to copy link");
        }
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                <DotVerticalIcon />
            </IconButton>

            <Popover
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box width={200} display="flex" flexDirection="column" p={0.5}>
                    <Button
                        startIcon={<EyeIcon />}
                        variant="text"
                        color="inherit"
                        onClick={handleView}
                        sx={{
                            pl: 2,
                            textTransform: "none",
                            justifyContent: "flex-start"
                        }}
                    >
                        View
                    </Button>

                    <Button
                        startIcon={<LinkIcon />}
                        variant="text"
                        color="inherit"
                        onClick={handleCopyLink}
                        sx={{
                            pl: 2,
                            textTransform: "none",
                            justifyContent: "flex-start"
                        }}
                    >
                        Copy Link
                    </Button>
                </Box>
            </Popover>
        </>
    )
}