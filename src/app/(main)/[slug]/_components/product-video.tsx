import Box from "@mui/material/Box";
import Image from "next/image";

import productVideoThumbnail from "@/../public/assets/product-video-thumbnail.svg";

export const ProductVideo = ({
  videoUrl,
}: {
  videoUrl: string | null | undefined;
}) => {

    // ✅ Convert YouTube short links or normal watch links to embed format
  const getEmbedUrl = (url: string | null | undefined) => {
    if (!url) return null;

    // Match YouTube short link or watch URL
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const embedUrl = getEmbedUrl(videoUrl); 
  return (
    <Box id="#product-video" sx={{ p: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          width: "100%",
          height: 560,
          overflow: "hidden",
          position: "relative",
          borderRadius: "10px",
        }}
      >
         {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Product Video"
            allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: "none" }}
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
