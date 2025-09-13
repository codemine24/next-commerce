import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { OptimizeImage } from "@/components/optimize-image";
import { currencyFormatter } from "@/utils/currency-formatter";

import { AddToCartIconButton } from "./add-to-cart-icon-button";
import { AddWishListButton } from "./add-wish-list-button";
import { ProductDiscountLabel } from "./product-discount-label";
import { ProductQuickViewButton } from "./product-quick-view-button";

interface Product {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  discount_price: number;
}

export const ProductCard = async ({
  product,
  action = false,
}: {
  product: Product;
  action?: boolean;
}) => {
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
        <Box sx={{ position: "relative", p: 2, pb: 0, borderBottom: 1, borderColor: "divider" }}>
          <OptimizeImage
            src="/images/featured_image_1.svg"
            alt={product.name}
            height={290}
            imageStyle={{ objectFit: "contain" }}
          />

          {/* Action icons */}
          <Stack
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
            <AddToCartIconButton />
          </Stack>
        </Box>

        {/* Product name */}
        <Box height={80} mt={2} px={2}>
          <Typography
            variant="h4"
            sx={{ "&:hover": { textDecoration: "underline" } }}
          >
            {product.name}
          </Typography>
        </Box>
      </Box>

      {/* Price and quick view */}
      <Stack direction="row" justifyContent="space-between" px={2}>
        <Stack direction="row" spacing={3} alignItems="center" mt={1}>
          <Typography variant="h4">
            {currencyFormatter(product.discount_price)}
          </Typography>
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "text.secondary" }}
          >
            {currencyFormatter(product.price)}
          </Typography>
        </Stack>
        {!action && <ProductQuickViewButton />}
      </Stack>

      {/* Action buttons (Add to Cart etc) */}
      {action && (
        <Box display="flex" gap={1} mt={2} px={2}>
          <Button variant="soft" color="primary" fullWidth>
            Add to Cart
          </Button>
          <ProductQuickViewButton />
        </Box>
      )}

      {/* discount label */}
      <ProductDiscountLabel />
    </Box>
  );
};