"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
} from "react";

type PropType = {
  images: string[];
  options?: EmblaOptionsType;
  thumbDirection?: "horizontal" | "vertical";
};

export const ProductCarousel = ({
  images,
  options,
  thumbDirection = "horizontal",
}: PropType) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: thumbDirection === "vertical" ? "y" : "x",
  });

  const isVertical = thumbDirection === "vertical";

  // Refs for each thumb
  const thumbRefs = useMemo(
    () => images.map(() => React.createRef<HTMLDivElement>()),
    [images]
  );

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    const index = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(index);

    // Scroll to selected thumb
    if (isVertical) {
      const selectedThumb = thumbRefs[index]?.current;
      if (selectedThumb) {
        selectedThumb.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    } else {
      emblaThumbsApi?.scrollTo(index);
    }
  }, [emblaMainApi, emblaThumbsApi, thumbRefs, isVertical]);

  useEffect(() => {
    if (!emblaMainApi) return;

    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);

    return () => {
      emblaMainApi?.off("select", onSelect);
      emblaMainApi?.off("reInit", onSelect);
    };
  }, [emblaMainApi, onSelect]);

  return (
    <Box display="flex" flexDirection={isVertical ? "row" : "column"} gap={2}>
      {/* Thumbnails on left if vertical */}
      {isVertical && (
        <Box
          ref={emblaThumbsRef}
          sx={{
            overflow: "hidden",
            height: 350,
            width: 70,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {images.map((image, index) => (
              <ThumbImage
                key={index}
                ref={thumbRefs[index]}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                image={image}
                index={index}
                direction="vertical"
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Main carousel */}
      <Box ref={emblaMainRef} overflow="hidden" flex={1}>
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
                height: 375,
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

      {/* Thumbnails below if horizontal */}
      {!isVertical && (
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
                ref={thumbRefs[index]}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                image={image}
                index={index}
                direction="horizontal"
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

type ThumbImagePropType = {
  selected: boolean;
  index: number;
  image: string;
  onClick: () => void;
  direction: "horizontal" | "vertical";
};

const ThumbImage = forwardRef<HTMLDivElement, ThumbImagePropType>(
  ({ selected, image, onClick, direction }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          flex:
            direction === "vertical"
              ? "0 0 70px"
              : { xs: "0 0 22%", sm: "0 0 18%" },
          minWidth: 0,
          padding: direction === "vertical" ? "0 0 0.8rem 0" : "0 0.8rem 0 0",
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
            borderColor: selected ? "primary.main" : "#E6F2EE",
            padding: 0,
            margin: 0,
            height: direction === "vertical" ? 70 : { xs: 70, sm: 100 },
            width: direction === "vertical" ? 70 : 100,
            borderRadius: 0,
            // pl: 2,
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
  }
);

ThumbImage.displayName = "ThumbImage";