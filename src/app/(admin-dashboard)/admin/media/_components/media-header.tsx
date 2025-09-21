"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { UploadCloudIcon } from "@/icons/upload-cloud";

import { MediaUploadDialog } from "./media-upload-dialog";

export const MediaHeader = () => {
    const [open, setOpen] = useState(false);
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Media</Typography>
            <Button
                onClick={() => setOpen(true)}
                variant="contained"
                startIcon={<UploadCloudIcon />}
            >
                Upload
            </Button>

            <MediaUploadDialog
                title="Upload Media"
                open={open}
                onClose={() => setOpen(false)}
            />
        </Box>
    );
};
