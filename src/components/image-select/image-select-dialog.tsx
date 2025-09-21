"use client";

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { useCallback, useState } from "react"

import { uploadFiles } from "@/actions/file";
import { Uploader } from "@/app/(dashboard)/admin/media/_components/uploader/uploader";
import { UploadCloudIcon } from "@/icons/upload-cloud";
import { toast } from "@/lib/toast-store";

import { ImageLibrary } from "./image-library";
import { AnimatedDialog } from "../modal/animate-dialog";

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
    const [selectedTab, setSelectedTab] = useState(TABS[0].value);
    const [files, setFiles] = useState<(File | string)[]>([]);
    const [loading, setLoading] = useState(false);

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            setFiles([...files, ...acceptedFiles]);
        },
        [files]
    );

    // Remove All Files
    const handleRemoveAll = () => setFiles([]);

    const handleUpload = async () => {
        setLoading(true);
        const formData = new FormData();

        files.forEach(file => formData.append("files", file));

        const res = await uploadFiles(formData);

        if (!res.success) {
            toast.error(res.message);
        } else {
            toast.success(res.message);
        }

        setLoading(false);
        setSelectedTab(TABS[0].value);
    };

    return (
        <AnimatedDialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth={selectedTab === "library" ? "lg" : "sm"}
            sx={{ minHeight: 240 }}
        >
            <DialogTitle>{selectedTab === "library" ? "Select Image" : "Upload Image"}</DialogTitle>
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
                            onSelectionChange={(file) => onFilesSelect(file)}
                        />
                    )}
                    {selectedTab === "upload" && (
                        <Uploader
                            multiple={multiple}
                            value={files}
                            onDrop={handleDrop}
                            onRemove={(file) => setFiles(files.filter((f) => f !== file))}
                        />
                    )}
                </Box>
            </DialogContent>

            {/* Dialog Actions */}
            <DialogActions>
                {/* Action Buttons for Library Tab */}
                {selectedTab === "library" && (
                    <>
                        <Button onClick={onClose} variant="outlined">Cancel</Button>
                        <Button onClick={onSelect} variant="contained">Select</Button>
                    </>
                )}

                {/* Action Buttons for Upload Tab */}
                {selectedTab === "upload" && (
                    <>
                        <Button
                            onClick={handleRemoveAll}
                            variant="outlined"
                            disabled={files.length === 0 || loading}
                        >
                            Remove All
                        </Button>
                        <Button
                            onClick={handleUpload}
                            variant="contained"
                            disabled={files.length === 0 || loading}
                            startIcon={<UploadCloudIcon />}
                        >
                            {loading ? 'Uploading...' : 'Upload'}
                        </Button>
                    </>
                )}
            </DialogActions>
        </AnimatedDialog>
    )
}   