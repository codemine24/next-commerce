import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Image, { StaticImageData } from "next/image";
import { CSSProperties } from "react";

const placeholderImage = "/assets/image-placeholder.png";

type OptimizeImageProps = {
  src?: string | StaticImageData;
  alt?: string;
  sx?: SxProps;
  height?: number;
  width?: number;
  imageStyle?: CSSProperties;
  quality?: number;
  priority?: boolean;
  loading?: "eager" | "lazy";
  blurDataURL?: string;
  placeholder?: "blur" | "empty";
};

export const OptimizeImage = ({
  src,
  alt = "Image",
  sx,
  height,
  width,
  imageStyle,
  quality = 80,
  priority = false,
  loading = "lazy",
  blurDataURL,
  placeholder = blurDataURL ? "blur" : "empty",
}: OptimizeImageProps) => {
  const srcImage = src || placeholderImage;

  return (
    <Box
      sx={{
        width: width || "100%",
        height: height || "100%",
        position: "relative",
        overflow: "hidden",
        ...sx,
      }}
    >
      <Image
        src={srcImage}
        alt={alt}
        fill
        quality={quality}
        priority={priority}
        loading={loading}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        style={{
          objectFit: "cover",
          objectPosition: "center center",
          ...imageStyle,
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </Box>
  );
};
