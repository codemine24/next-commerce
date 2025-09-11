import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { OptimizeImage } from "@/components/optimize-image";
import { currencyFormatter } from "@/utils/currency-formatter";

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
        py: { xs: 2, md: 3 },
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "divider",
        p: 2,
      }}
    >
      <Box component={Link} href={`/${product.slug}`}>
        <OptimizeImage
          src="/images/featured_image_1.svg"
          alt={product.name}
          height={290}
        />

        <Box height={50} mt={1.5}>
          <Typography
            variant="h4"
            sx={{ "&:hover": { textDecoration: "underline" } }}
          >
            {product.name}
          </Typography>
        </Box>
      </Box>

      <Stack direction="row" justifyContent="space-between" mt={1}>
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
        <ProductQuickViewButton />
      </Stack>

      {action && (
        <Box display="flex" gap={1} mt={2}>
          <ProductQuickViewButton />
          <Button variant="soft" color="primary" fullWidth>
            Add to Cart
          </Button>
        </Box>
      )}
    </Box>
  );
};
