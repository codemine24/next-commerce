"use client";

import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { useCallback, useState, useTransition } from "react"

import { uploadFiles } from "@/actions/file";
import { Uploader } from "@/components/uploader/uploader";
import { useFetch } from "@/hooks/use-fetch";
import { CloseIcon } from "@/icons/close";
import { UploadCloudIcon } from "@/icons/upload-cloud";
import { API_ROUTES } from "@/lib/api-routes";
import { toast } from "@/lib/toast-store";

import { AnimatedDialog } from "../animate-dialog";

import { ImageLibrary } from "./image-library";

const TABS = [
    { label: "Library", value: "library" },
    { label: "Upload", value: "upload" },
]

interface ImageSelectModalProps {
    open: boolean;
    multiple: boolean;
    onClose: () => void;
    selectedFiles: string | string[];
    onSelect: () => void;
    onFilesSelect: (file: string) => void;
}

export const ImageSelectDialog = (props: ImageSelectModalProps) => {
    const { open, multiple, onClose, selectedFiles, onSelect, onFilesSelect } = props;
    const { data, success, message, isLoading, revalidate } = useFetch(API_ROUTES.files.get_files);

    const [selectedTab, setSelectedTab] = useState(TABS[0].value);
    const [files, setFiles] = useState<(File | string)[]>([]);
    const [loading, startTransition] = useTransition();

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            setFiles([...files, ...acceptedFiles]);
        },
        [files]
    );

    // Remove All Files
    const handleRemoveAll = () => setFiles([]);

    // Handle Close
    const handleClose = () => {
        setFiles([]);
        onClose();
    };

    // Handle Upload to Server
    const handleUpload = async () => {
        // Calculate total file size
        const fileSize = files.reduce((total, file) => total + (file instanceof File ? file.size : 0), 0);

        // Check if total file size exceeds 3MB
        if (fileSize > 1024 * 1024 * 3) {
            toast.error("File size exceeds 3MB limit");
            return;
        }

        startTransition(async () => {
            const formData = new FormData();
            files.forEach(file => formData.append("files", file));

            const res = await uploadFiles(formData);

            if (!res.success) {
                toast.error(res.message);
            } else {
                revalidate();
                toast.success(res.message);
            }

            setFiles([]);
            setSelectedTab(TABS[0].value);
        });
    };

    return (
        <AnimatedDialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={false}
            sx={{
                "& .MuiDialog-paper": {
                    minHeight: 240,
                    width: selectedTab === "library" ? 1200 : 600,
                    transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }
            }}
        >
            {/* Close Button */}
            <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
                <CloseIcon />
            </IconButton>

            {/* Dialog Title */}
            <DialogTitle>{selectedTab === "library" ? "Select Image" : "Upload Image"}</DialogTitle>

            {/* Dialog Content */}
            <DialogContent>
                {/* Tabs */}
                <Tabs
                    value={selectedTab}
                    onChange={(event, newValue) => setSelectedTab(newValue)}
                    sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: 'background.default' }}
                >
                    {TABS.map((tab) => (
                        <Tab key={tab.value} label={tab.label} value={tab.value} />
                    ))}
                </Tabs>

                {/* Tabs Content */}
                <Box py={2}>
                    {selectedTab === "library" && (
                        <ImageLibrary
                            multiple={multiple}
                            selectedFiles={selectedFiles}
                            data={data}
                            success={success}
                            message={message}
                            isLoading={isLoading}
                            revalidate={revalidate}
                            onSelectionChange={(file) => onFilesSelect(file)}
                        />
                    )}
                    {selectedTab === "upload" && (
                        <Uploader
                            value={files}
                            onDrop={handleDrop}
                            onRemove={(file) => setFiles(files.filter((f) => f !== file))}
                        />
                    )}
                </Box>
            </DialogContent>

            {/* Dialog Actions */}
            <DialogActions sx={{ justifyContent: selectedTab === "upload" ? "space-between" : "flex-end" }}>
                {selectedTab === "upload" && (
                    <Typography variant="subtitle2" fontWeight={500} color="error">
                        Max file size: 3MB
                    </Typography>
                )}

                <Box display="flex" gap={2}>
                    {/* Action Buttons for Library Tab */}
                    {selectedTab === "library" && (
                        <>
                            <Button onClick={handleClose} variant="outlined">Cancel</Button>
                            <Button onClick={onSelect} variant="contained" disabled={!selectedFiles?.length}>Select</Button>
                        </>
                    )}

                    {/* Action Buttons for Upload Tab */}
                    {selectedTab === "upload" && (
                        <>
                            <Button
                                onClick={handleRemoveAll}
                                variant="outlined"
                                disabled={!files.length || loading}
                            >
                                Remove All
                            </Button>
                            <Button
                                onClick={handleUpload}
                                variant="contained"
                                disabled={!files.length || loading}
                                startIcon={<UploadCloudIcon />}
                            >
                                {loading ? 'Uploading...' : 'Upload'}
                            </Button>
                        </>
                    )}
                </Box>
            </DialogActions>
        </AnimatedDialog>
    )
}   