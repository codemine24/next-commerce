import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { CloseIcon } from "@/icons/close";
import { UploadCloudIcon } from "@/icons/upload-cloud";

import { InputLabel } from "./input-label";

type FileUploaderProps = {
    label: string;
    required?: boolean;
    multiple?: boolean;
    accept?: { [mime: string]: string[] };
    onFilesChange: (files: File[]) => void;
    hidePlaceholderText?: boolean;
    containerSx?: SxProps;
    uploadBoxSx?: SxProps;
    previewBoxSx?: SxProps;
};

export const FileUploader = ({
    label,
    required = false,
    multiple = false,
    accept = { "image/*": [] },
    onFilesChange,
    hidePlaceholderText = false,
    containerSx,
    uploadBoxSx,
    previewBoxSx,
}: FileUploaderProps) => {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = multiple
                ? [...files, ...acceptedFiles]
                : [acceptedFiles[0]];
            setFiles(newFiles);
            onFilesChange?.(newFiles);
        },
        [multiple, files, onFilesChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        multiple,
        onDrop,
    });

    const handleRemove = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
    };

    return (
        <Box display="flex" flexDirection="column" sx={containerSx}>
            <InputLabel label={label} required={required} sx={{ mb: 1 }} />
            {/* Upload Box */}
            <Box
                {...getRootProps()}
                sx={{
                    width: ["100%", 550],
                    height: "100%",
                    border: "1px dotted",
                    borderColor: "divider",
                    px: 4,
                    py: 8,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "0.25s ease",
                    ...uploadBoxSx,
                }}
            >
                <input {...getInputProps()} />

                {/* Placeholder */}
                <UploadCloudIcon width={50} height={50} />
                {!hidePlaceholderText && <Typography color="text.primary">
                    {isDragActive ? "Drop files here..." : "Drop or select file"}
                </Typography>}
                {!hidePlaceholderText && <Typography variant="body2" color="text.secondary">
                    Drop files here or click to browse your machine.
                </Typography>}
            </Box>

            {/* Image Previews */}
            {files.length > 0 && (
                <Stack direction="row" gap={2} flexWrap="wrap" mt={3}>
                    {files.map((file, index) => (
                        <Fade in key={index}>
                            <Box
                                sx={{
                                    position: "relative",
                                    width: 100,
                                    height: 100,
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                    transition: "transform 0.3s ease",
                                    ...previewBoxSx,
                                }}
                            >
                                <Zoom in>
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        fill
                                        objectFit="cover"
                                    />
                                </Zoom>
                                <IconButton
                                    size="small"
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        background: "rgba(0,0,0,0.4)",
                                        color: "white",
                                        "&:hover": { background: "rgba(0,0,0,0.6)" },
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove(index);
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Fade>
                    ))}
                </Stack>
            )}
        </Box>
    );
};