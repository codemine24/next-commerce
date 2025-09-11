"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { type SxProps, type Theme } from "@mui/material/styles";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import * as React from "react";

import { ArrowBackIcon } from "@/icons/arrow-back";
import { ArrowForwardIcon } from "@/icons/arrow-forward";

type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];

type CarouselProps = {
  opts?: CarouselOptions;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  sx?: SxProps<Theme>;
  children: React.ReactNode;
};

const CarouselContext = React.createContext<{
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  orientation: "horizontal" | "vertical";
  api: CarouselApi | undefined;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

export const Carousel: React.FC<CarouselProps> = ({
  orientation = "horizontal",
  opts,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  setApi,
  sx,
  children,
}) => {
  const autoplayPlugin = React.useRef(
    Autoplay(
      { delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: false },
    )
  );

  const plugins = autoplay ? [autoplayPlugin.current] : [];
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y", loop: true },
    plugins
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  const onSelect = React.useCallback((api: CarouselApi) => {
    setCanScrollPrev(api?.canScrollPrev() ?? false);
    setCanScrollNext(api?.canScrollNext() ?? false);
  }, []);

  React.useEffect(() => {
    if (!api) return;
    setApi?.(api);
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, setApi, onSelect]);

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      autoplayPlugin.current.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      autoplayPlugin.current.play();
    }
  };

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        orientation,
        api,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <Box
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") scrollPrev();
          if (e.key === "ArrowRight") scrollNext();
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ position: "relative", ...sx }}
      >
        <Box overflow="hidden">{children}</Box>
      </Box>
    </CarouselContext.Provider>
  );
};

// === CONTENT ===

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { sx?: SxProps<Theme> }
>(({ sx, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <Box ref={carouselRef}>
      <Box
        ref={ref}
        sx={{
          display: "flex",
          flexDirection: orientation === "horizontal" ? "row" : "column",
          ml: orientation === "horizontal" ? "-16px" : 0,
          mt: orientation === "vertical" ? "-16px" : 0,
          ...sx,
        }}
        {...props}
      />
    </Box>
  );
});
CarouselContent.displayName = "CarouselContent";

// === ITEM ===

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { sx?: SxProps<Theme> }
>(({ sx, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <Box
      ref={ref}
      role="group"
      aria-roledescription="slide"
      sx={{
        minWidth: 0,
        flex: "0 0 100%",
        pl: orientation === "horizontal" ? "16px" : 0,
        pt: orientation === "vertical" ? "16px" : 0,
        ...sx,
      }}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

// === PREV ===

export const CarouselPrev = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof IconButton> & { icon?: React.ReactNode }
>(({ sx, icon, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return (
    <IconButton
      color="primary"
      ref={ref}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      sx={{
        position: "absolute",
        bottom: orientation === "horizontal" ? "-48px" : "50%",
        right: orientation === "horizontal" ? "56px" : "50%",
        transform:
          orientation === "horizontal"
            ? "translateY(-50%)"
            : "translate(-50%, -100%) rotate(90deg)",
        backgroundColor: "primary.main",
        border: "1px solid",
        borderColor: "divider",
        zIndex: 1,
        ...sx,
      }}
      {...props}
    >
      {icon ?? <ArrowBackIcon sx={{ fontSize: 16 }} />}
    </IconButton>
  );
});
CarouselPrev.displayName = "CarouselPrev";

// === NEXT ===

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof IconButton> & { icon?: React.ReactNode }
>(({ sx, icon, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return (
    <IconButton
      color="primary"
      ref={ref}
      onClick={scrollNext}
      disabled={!canScrollNext}
      sx={{
        position: "absolute",
        bottom: orientation === "horizontal" ? "-48px" : "50%",
        right: orientation === "horizontal" ? 0 : "50%",
        transform:
          orientation === "horizontal"
            ? "translateY(-50%)"
            : "translate(-50%, 100%) rotate(90deg)",
        backgroundColor: "primary.main",
        border: "1px solid",
        borderColor: "divider",
        zIndex: 1,
        ...sx,
      }}
      {...props}
    >
      {icon ?? <ArrowForwardIcon sx={{ fontSize: 16 }} />}
    </IconButton>
  );
});
CarouselNext.displayName = "CarouselNext";

// === DOTS ===

type CarouselDotsProps = {
  variant?: "dot" | "line";
  sx?: SxProps<Theme>;
};

export const CarouselDots: React.FC<CarouselDotsProps> = ({
  variant = "dot",
  sx,
}) => {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (!api) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 10,
          px: 2,
          py: 1,
          ...sx,
        }}
      >
        {api.slideNodes().map((_, index) => {
          const isSelected = selectedIndex === index;
          const baseStyle = {
            cursor: "pointer",
            outline: "none",
            border: isSelected ? "none" : "1px solid",
            backgroundColor: isSelected ? "#03140E" : "grey.400",
            borderColor: isSelected ? "primary.main" : "grey.400",
            transition: "all 0.3s",
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "primary.main",
              outlineOffset: 2,
            },
          };

          const variantStyles =
            variant === "dot"
              ? { width: 8, height: 8, borderRadius: "50%" }
              : { width: 24, height: 4, borderRadius: 3 };

          return (
            <Box
              key={index}
              component="button"
              onClick={() => api.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              sx={{ ...baseStyle, ...variantStyles }}
            />
          );
        })}
      </Box>
    </Box>
  );
};