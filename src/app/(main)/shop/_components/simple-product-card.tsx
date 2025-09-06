"use client";

import { Card, CardContent, Typography, CardMedia } from "@mui/material";

type SimpleProductCardProps = {
  title: string;
  subtitle: string;
  image: string;
};

export const SimpleProductCard = ({
  title,
  subtitle,
  image,
}: SimpleProductCardProps) => {
  return (
    <Card
      sx={{
        border: "1px solid #ccc",
        borderRadius: 0,
        boxShadow: "none",
        bgcolor: "transparent",
      }}
    >
      <CardContent>
        <Typography variant="h2" color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>

      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ objectFit: "cover", width: "100%", height: "auto" }}
      />
    </Card>
  );
};
