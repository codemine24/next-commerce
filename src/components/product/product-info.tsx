"use client";
import { Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { StarIcon } from "@/icons/star";

import { ProductActionButton } from "./product-action-button";

interface ProductInfoProps {
  open: boolean;
  onClose?: () => void;
}

export const ProductInfo = ({ open, onClose }: ProductInfoProps) => {
  return (
    <Box>
      <Chip label="In Stock" color="primary" variant="outlined" size="small"/>

      <Typography
        variant="h4"
        mt={1}
        sx={{ "&:hover": { textDecoration: "underline" } }}
      >
        Reddragon 59S5 RGB Speaker
      </Typography>

      {/* Rating & Stock */}
      <Box display="flex" alignItems="center" gap={2} mt={1}>
        <Box display="flex" alignItems="center">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <StarIcon key={index} fontSize="small" color="warning" />
            ))}
          (5.0)
        </Box>
        <Divider orientation="vertical" flexItem />
        <Typography>640 Reviews</Typography>
      </Box>

      {/* Price */}
      <Box display="flex" alignItems="center" gap={2} mt={4}>
        <Typography variant="h4">Tk 1,200</Typography>
        <Typography
          variant="body1"
          fontWeight={400}
          sx={{ textDecoration: "line-through", color: "text.secondary" }}
        >
          Tk 1,500
        </Typography>
      </Box>

      {/* Action Button */}
      <ProductActionButton open={open} onClose={onClose || (() => {})} />
    </Box>
  );
};
