import Box from "@mui/material/Box";
import Image from "next/image";

import productVideoThumbnail from "@/../public/assets/product-video-thumbnail.svg";

import { BORDER_RADIUS } from "@/theme";

export const ProductVideo = ({
  videoUrl,
}: {
  videoUrl: string | null | undefined;
}) => {
  return (
    <Box id="product-video" sx={{ p: { xs: 2, sm: 3 }, bgcolor: "background.paper" }}>
      <Box
        sx={{
          width: "100%",
          height: 560,
          overflow: "hidden",
          position: "relative",
          borderRadius: BORDER_RADIUS.default,
        }}
      >
        {videoUrl ? (
          <iframe
            src={videoUrl}
            title="Product Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Image
            src={productVideoThumbnail}
            alt="Product Video Thumbnail"
            fill
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
        )}
      </Box>
    </Box>
  );
};
