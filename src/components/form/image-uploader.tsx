"use client";

import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { MediaIcon } from "@/icons/media";

import { ImagePreview } from "../image-select/image-preview";
import { ImageSelectDialog } from "../image-select/image-select-dialog";

import { InputLabel } from "./input-label";

interface ImageUploaderProps {
    sx?: SxProps<Theme>;
    label: string;
    heading: string;
    required?: boolean;
    subHeading?: string;
    multiple?: boolean;
    name: string;
}

export const ImageUploader = ({ sx, label, required, heading, subHeading, multiple = false, name }: ImageUploaderProps) => {
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const { control, setValue, watch, resetField } = useFormContext();
    const selectedImages = watch(name);;

    const handleSelectImage = (image: string) => {
        if (multiple) {
            const newSelectedImage = selectedImages.includes(image) ? selectedImages.filter((img: string) => img !== image) : [...selectedImages, image];
            setValue(name, newSelectedImage);
        } else {
            setValue(name, image);
        }
    };

    const handleOnClose = () => {
        resetField(name);
        setOpenUploadModal(false);
    };

    const handleSelect = () => {
        setValue(name, selectedImages);
        setOpenUploadModal(false);
    }

    return (
        <Box display="flex" flexDirection="column" sx={sx}>
            <InputLabel label={label} required={required} sx={{ mb: 1 }} />
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        <Box
                            p={4}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                            bgcolor="background.paper"
                            border={1}
                            borderColor="divider"
                            onClick={() => setOpenUploadModal(true)}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': { opacity: 0.72 },
                            }}
                        >
                            <MediaIcon sx={{ height: 50, width: 50, color: 'primary.main' }} />

                            <Stack spacing={1} textAlign="center" mt={2}>
                                <Box sx={{ typography: 'h6' }}>{heading}</Box>
                                {subHeading && (
                                    <Box sx={{ typography: 'body2', color: 'text.secondary' }}>{subHeading}</Box>
                                )}
                            </Stack>
                        </Box>

                        {/* Selected Images preview */}
                        <Box width="fit-content" mt={2}>
                            {/* For Multiple Images Preview */}
                            <Stack direction="row" spacing={2}>
                                {field.value?.length > 0 && multiple && field.value.map((image: string) => (
                                    <ImagePreview key={image} path={image} field={field} multiple setValue={setValue} />
                                ))}
                            </Stack>

                            {/* For Single Image Preview */}
                            {field.value && !multiple && (
                                <ImagePreview path={field.value} field={field} setValue={setValue} />
                            )}
                        </Box>
                    </>
                )}
            />

            {/* Image Select Modal */}
            <ImageSelectDialog
                multiple={multiple}
                open={openUploadModal}
                selectedFiles={selectedImages}
                onClose={handleOnClose}
                onSelect={handleSelect}
                onFilesSelect={(files) => handleSelectImage(files)}
            />
        </Box>
    )
}