"use client";

import { Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { ProductPrice } from "@/app/(main)/shop/_components/product-price";
import { StarIcon } from "@/icons/star";
import { Product } from "@/interfaces/product";

import { ProductActionButton } from "./product-action-button";

interface ProductInfoProps {
  product: Product;
  onClose?: () => void;
}

export const ProductInfo = ({ onClose, product }: ProductInfoProps) => {
  return (
    <Box>
      <Chip label="In Stock" color="primary" variant="outlined" size="small" />

      <Typography
        variant="h4"
        mt={1}
        sx={{ "&:hover": { textDecoration: "underline" } }}
      >
        {product.name}
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
      <Box mt={3}>
        <ProductPrice product={product} />
      </Box>

      {/* Action Button */}
      <ProductActionButton open={false} onClose={onClose || (() => { })} />
    </Box>
  );
};
