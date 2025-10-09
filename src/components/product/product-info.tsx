import { alpha, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ProductPrice } from "@/app/(main)/shop/_components/product-price";
import { CheckCircle } from "@/icons/check-circle";
import { StarIcon } from "@/icons/star";
import { Product } from "@/interfaces/product";
import { BORDER_RADIUS } from "@/theme";

import { ProductActionButton } from "./product-action-button";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ "&:hover": { textDecoration: "underline" } }}
      >
        {product?.name}
      </Typography>

      {/* Rating & Stock */}
      <Box display="flex" alignItems="center" gap={2} mt={2.8}>
        <Box display="flex" alignItems="center" color="#A4B2AE">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <StarIcon
                key={index}
                fontSize="small"
                sx={{
                  color: "#ffcd4e",
                }}
              />
            ))}
        </Box>

        <Typography color="#A4B2AE">(5.0) | 640 Reviews</Typography>
        <Chip
          label="In Stock"
          variant="outlined"
          size="small"
          icon={<CheckCircle sx={{ color: "#08996B !important" }} />}
          sx={{
            color: "#08996B",
            borderColor: "#08996B",
            bgcolor: alpha("#08996B", 0.06),
            borderRadius: BORDER_RADIUS.default,
          }}
        />
      </Box>
      <ProductPrice product={product} />
      <ProductActionButton product={product} />
    </Box>
  );
};
