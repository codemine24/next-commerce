"use client";

import { Box, Button, Typography } from "@mui/material";

interface AvailableSizeProps {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
}

export const AvailableSize = ({
  sizes,
  selectedSize,
  onSelect,
}: AvailableSizeProps) => {
  return (
    <Box>
      <Typography fontSize={16} fontWeight={400} mb={1}>
        Available Size
      </Typography>
      <Box display="flex" gap={1}>
        {sizes.map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? "contained" : "outlined"}
            onClick={() => onSelect(size)}
            sx={{
              minWidth: 48,
              height: 48,
              textTransform: "none",
              border: selectedSize === size ? "#08996B" : "1px solid #E5E7EB",
              "&:hover": {
                border: "1px solid #08996B",
              },
            }}
          >
            {size}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
