"use client";

import { Box, Typography } from "@mui/material";

import { ColorOption } from "./color-option";

interface AvailableColorsProps {
  colors: string[];
  selectedColor: string;
  onSelect: (color: string) => void;
}

export const AvailableColors = ({
  colors,
  selectedColor,
  onSelect,
}: AvailableColorsProps) => {
  return (
    <Box>
      <Typography fontSize={16} fontWeight={400} mb={1}>
        Colors
      </Typography>
      <Box display="flex" gap={2}>
        {colors.map((color) => (
          <ColorOption
            key={color}
            color={color}
            isSelected={selectedColor === color}
            onClick={() => onSelect(color)}
          />
        ))}
      </Box>
    </Box>
  );
};
