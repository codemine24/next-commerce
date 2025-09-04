"use client";

import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from "next/image";

type PropType = {
    images: string[];
    options?: EmblaOptionsType;
};

export const ProductCarousel = ({ images, options }: PropType) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
    });

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return;
            emblaMainApi.scrollTo(index);
        },
        [emblaMainApi, emblaThumbsApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        const index = emblaMainApi.selectedScrollSnap();
        setSelectedIndex(index);
        emblaThumbsApi.scrollTo(index);
    }, [emblaMainApi, emblaThumbsApi]);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();

        emblaMainApi.on("select", onSelect).on("reInit", onSelect);
        return () => {
            emblaMainApi.off("select", onSelect);
            emblaMainApi.off("reInit", onSelect);
        };
    }, [emblaMainApi, onSelect]);

    return (
        <Box>
            {/* Main carousel */}
            <Box
                ref={emblaMainRef}
                overflow="hidden"
            >
                <Box
                    sx={{
                        display: "flex",
                        touchAction: "pan-y pinch-zoom",
                        marginLeft: "-1rem",
                    }}
                >
                    {images.map((image, index) => (
                        <Box
                            key={index}
                            sx={{
                                transform: "translate3d(0, 0, 0)",
                                flex: "0 0 100%",
                                minWidth: 0,
                                paddingLeft: "1rem",
                                height: 304,
                            }}
                        >
                            <Image
                                src={image}
                                alt={`Slide ${index + 1}`}
                                draggable={false}
                                fill
                                style={{ objectFit: "cover", userSelect: "none" }}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Thumbnails */}
            <Box mt={2}>
                <Box ref={emblaThumbsRef} overflow="hidden">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginLeft: "-0.8rem",
                        }}
                    >
                        {images.map((image, index) => (
                            <ThumbImage
                                key={index}
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                image={image}
                                index={index}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

type ThumbImagePropType = {
    selected: boolean;
    index: number;
    image: string;
    onClick: () => void;
};

const ThumbImage = ({ selected, image, onClick }: ThumbImagePropType) => {
    return (
        <Box
            sx={{
                flex: { xs: "0 0 22%", sm: "0 0 17%" },
                minWidth: 0,
                paddingLeft: "0.8rem",
            }}
        >
            <Button
                onClick={onClick}
                type="button"
                sx={{
                    appearance: "none",
                    touchAction: "manipulation",
                    display: "inline-flex",
                    textDecoration: "none",
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: selected ? "primary.main" : "transparent",
                    padding: 0,
                    margin: 0,
                    height: { xs: 70, sm: 80 },
                    width: "100%",
                    borderRadius: 0,
                }}
            >
                <Image
                    src={image}
                    alt={`Thumbnail ${image}`}
                    draggable={false}
                    fill
                    style={{
                        objectFit: "cover",
                        pointerEvents: "none",
                        userSelect: "none",
                        borderRadius: 0,
                    }}
                />
            </Button>
        </Box>
    );
};