"use client";

import { Box, Typography } from "@mui/material";

interface DetailsCardProps {
  index: number;
  title: string;
  description: string;
}

export const DetailsCard = ({
  index,
  title,
  description,
}: DetailsCardProps) => {
  return (
    <Box mb={2}>
      <Typography
        variant="subtitle1"
        color="#222625"
        fontWeight="500"
        gutterBottom
      >
        {index + 1}. {title}
      </Typography>
      <Typography
        variant="body2"
        color="#222625"
        fontSize={14}
        fontWeight="400"
      >
        {description}
      </Typography>
    </Box>
  );
};
