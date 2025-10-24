import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { OptimizeImage } from "@/components/optimize-image";
import { Product } from "@/interfaces/product";
import { makeImageUrl } from "@/utils/helper";

import BuyNowButton from "./buy-now-button";
import { ProductDiscountLabel } from "./product-discount-label";
import { ProductPrice } from "./product-price";
import { ProductQuickViewButton } from "./product-quick-view-button";

interface ProductCardProps {
  product: Product;
  action?: boolean;
}

export const ProductCard = async ({
  product,
}: ProductCardProps) => {
  return (
    <Box
      sx={{
        pb: { xs: 1, md: 2 },
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "divider",
        position: "relative",
        overflow: "hidden",
        "&:hover .hover-overlay": {
          opacity: { md: 1 },
        },
        "&:hover .action-icons": {
          opacity: { md: 1 },
          transform: { md: "translateY(0)" },
        },
      }}
    >
      <Box
        component={Link}
        href={`/${product.slug}`}
        sx={{
          position: "relative",
          display: "block",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <OptimizeImage
            src={makeImageUrl(product.thumbnail) || "/images/featured_image_1.svg"}
            alt={product.name}
            height={220}
            imageStyle={{ objectFit: "contain" }}
          />
        </Box>
        <Box mt={2} px={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ "&:hover": { textDecoration: "underline" } }}
          >
            {product.name}
          </Typography>
        </Box>
      </Box>

      <ProductPrice product={product} />

      <Stack direction="row" justifyContent="center" gap={1} px={2} mt={1}>
        <BuyNowButton product={product} />
        <ProductQuickViewButton product={product} />
      </Stack>

      {/* {action && (
        <Box display="flex" gap={1} mt={2} px={2}>
          <AddToCartButton product={product} />
          <ProductQuickViewButton product={product} />
        </Box>
      )} */}
      <ProductDiscountLabel />
    </Box>
  );
};
