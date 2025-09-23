"use client";

import { Box } from "@mui/material";
import { useState } from "react";

import { AvailableColors } from "./available-colors";
import { AvailableSize } from "./available-size";

const sizes = ["S", "M", "L", "XL"];
const colors = ["#A4B2AE", "#FFBA2E", "#14CC92"];

export const ProductOptions = () => {
  const [selectedSize, setSelectedSize] = useState<string>("S");
  const [selectedColor, setSelectedColor] = useState<string>(colors[2]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ gap: 4 }}
    >
      <AvailableSize
        sizes={sizes}
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
      />

      <AvailableColors
        colors={colors}
        selectedColor={selectedColor}
        onSelect={setSelectedColor}
      />
    </Box>
  );
};
