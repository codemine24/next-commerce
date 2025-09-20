"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";

interface CollectionBoxProps {
  image: string;
  title: string;
  href: string;
}

export const CollectionBox = ({ image, title, href }: CollectionBoxProps) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 300,
          overflow: "hidden",
          cursor: "pointer",
          "&:hover .MuiTypography-root": {
            transform: "translate(-100%, -8px)",
          },
          "&:hover .MuiTypography-root::after": {
            width: "100%",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.0) 30%, rgba(0, 0, 0, 0.62) 100%)",
          }}
        />
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
        />

        <Typography
          variant="h2"
          sx={{
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: "translateX(-100%)",
            color: "white",
            fontWeight: 600,
            transition: "all 0.4s ease",
            "&::after": {
              content: '""',
              display: "block",
              width: "0%",
              height: "2px",
              bgcolor: "white",
              transition: "width 0.4s ease",
              marginTop: "4px",
            },
          }}
        >
          {title}
        </Typography>
      </Box>
    </Link>
  );
};
