"use client";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import { useCallback } from "react";

import { getFiles } from "@/actions/file";
import { useFetch } from "@/hooks/use-fetch";
import { Media } from "@/interfaces/media";
import { makeImageUrl } from "@/utils/helper";

import { LoadingSpinner } from "../loading-spinner";
import { OptimizeImage } from "../optimize-image";

interface ImageLibraryProps {
    multiple?: boolean;
    selectedFiles: string | string[];
    onSelectionChange: (selectedFiles: string) => void;
}

export const ImageLibrary = ({ multiple, selectedFiles, onSelectionChange }: ImageLibraryProps) => {
    const fetchData = useCallback(async () => await getFiles(), []);
    const { data, loading } = useFetch(fetchData);

    const isSelected = (file: string) => {
        if (multiple) {
            return (selectedFiles as string[]).some(f => f === file);
        }
        return selectedFiles === file;
    };

    // Loading Spinner Component
    if (loading) return <LoadingSpinner />;

    return (
        <Box>
            {/* No images found */}
            {data?.data?.length === 0 && (
                <Box>
                    <Typography>No images found</Typography>
                </Box>
            )}

            {/* Images Grid */}
            {data?.data?.length > 0 && (
                <Grid container spacing={2}>
                    {data?.data?.map((file: Media, index: number) => {
                        const selected = isSelected(file.path);
                        const SelectionControl = multiple ? Checkbox : Radio;

                        return (
                            <Grid
                                key={index}
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