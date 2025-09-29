import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { OptimizeImage } from "@/components/optimize-image";
import { Product } from "@/interfaces/product";
import { makeImageUrl } from "@/utils/helper";

import { AddToCartButton } from "./add-to-cart-button";
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
  action = false,
}: ProductCardProps) => {
  return (
    <Box
      sx={{
        pb: { xs: 2, md: 3 },
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
            p: 2,
            pb: 0,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <OptimizeImage
            src={
              makeImageUrl(product.thumbnail) || "/images/featured_image_1.svg"
            }
            alt={product.name}
            height={290}
            imageStyle={{ objectFit: "contain" }}
          />

          {/* Action icons */}
          {/* <Stack
            direction="column"
            spacing={1}
            className="action-icons"
            sx={{
              position: "absolute",
              top: 20,
              right: 8,
              opacity: { xs: 1, md: 0 },
              transform: { xs: "none", md: "translateY(-10px)" },
              transition: "opacity 0.3s ease, transform 0.3s ease",
              zIndex: 2,
            }}
          >
            <AddWishListButton />
            <AddToCartIconButton product={product} />
          </Stack> */}
        </Box>

        {/* Product name */}
        <Box height={60} mt={2} px={3}>
          <Typography
            variant="h4"
            sx={{ "&:hover": { textDecoration: "underline" } }}
          >
            {product.name}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <ProductPrice product={product} />
      </Box>

      {/* Price and quick view */}
      <Stack direction="row" justifyContent="center" gap={1} px={3} mt={1}>
        <BuyNowButton />
        {!action && <ProductQuickViewButton product={product} />}
      </Stack>

      {/* Action buttons (Add to Cart etc) */}
      {action && (
        <Box display="flex" gap={1} mt={2} px={2}>
          <AddToCartButton product={product} />
          <ProductQuickViewButton product={product} />
        </Box>
      )}

      {/* discount label */}
      <ProductDiscountLabel />
    </Box>
  );
};
