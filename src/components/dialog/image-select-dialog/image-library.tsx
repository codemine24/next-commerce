"use client";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";

import { Media } from "@/interfaces/media";
import { makeImageUrl } from "@/utils/helper";

import { LoadingSpinner } from "../../loading-spinner";
import { OptimizeImage } from "../../optimize-image";

interface ImageLibraryProps {
    multiple?: boolean;
    selectedFiles: string | string[];
    data: Media[];
    success: boolean;
    message: string;
    isLoading: boolean;
    onSelectionChange: (selectedFiles: string) => void;
}

export const ImageLibrary = (props: ImageLibraryProps) => {
    const { multiple, selectedFiles, data, success, message, isLoading, onSelectionChange } = props;

    const isSelected = (file: string) => {
        if (multiple) {
            return (selectedFiles as string[]).some(f => f === file);
        }
        return selectedFiles === file;
    };

    // Loading Spinner Component
    if (isLoading) return <LoadingSpinner />;

    // Error Component
    if (!success) return <Typography>{message}</Typography>;

    return (
        <Box>
            {/* No images found */}
            {data?.length === 0 && (
                <Box>
                    <Typography>No images found</Typography>
                </Box>
            )}

            {/* Images Grid */}
            {data?.length > 0 && (
                <Grid container spacing={2}>
                    {data?.map((file: Media) => {
                        const selected = isSelected(file.path);
                        const SelectionControl = multiple ? Checkbox : Radio;

                        return (
                            <Grid
                                key={file.id}
                                size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                                sx={{
                                    p: 1,
                                    border: 1,
                                    borderColor: selected ? "primary.main" : "divider",
                                    cursor: "pointer",
                                    borderRadius: 1,
                                    position: "relative",
                                    "&:hover": {
                                        borderColor: "primary.main",
                                        backgroundColor: "action.hover",
                                    },

                                    // Selection Indicator
                                    "&:before": {
                                        content: "''",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        zIndex: 2,
                                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                                        opacity: selected ? 1 : 0,
                                    },
                                }}
                                onClick={() => onSelectionChange(file.path)}
                            >
                                {/* Selection Control */}
                                <FormControlLabel
                                    control={
                                        <SelectionControl
                                            checked={selected}
                                            onChange={() => onSelectionChange(file.path)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    }
                                    label=""
                                    sx={{
                                        position: "absolute",
                                        zIndex: 5,
                                    }}
                                />

                                {/* Image */}
                                <Box sx={{ position: "relative", height: 180 }}>
                                    <OptimizeImage
                                        src={makeImageUrl(file.path)}
                                        alt={file.name}
                                        height={180}
                                        imageStyle={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: 4,
                                        }}
                                    />

                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Box>
    );
};