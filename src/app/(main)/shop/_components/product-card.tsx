import OptimizeImage from "@/components/ui/optimize-image";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import { ProductQuickViewButton } from "./product-quick-view-button";

interface Product {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  discount_price: number;
}

export const ProductCard = async ({ product, action = false }: { product: Product, action?: boolean }) => {
  return (
    <Box
      sx={{
        py: { xs: 2, md: 3 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box component={Link} href={`/${product.slug}`}>
        <OptimizeImage
          src="/assets/product.jpg"
          alt={product.name}
          height={250}
        />

        <Box height={50} mt={1.5}>
          <Typography
            component={Link}
            href={`/${product.slug}`}
            variant="h6"
            sx={{ "&:hover": { textDecoration: "underline" } }}
          >
            {product.name}
          </Typography>
        </Box>
      </Box>

      <Box mt={1}>
        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
          <Typography variant="h4">
            Tk {product.discount_price}
          </Typography>
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "text.secondary" }}
          >
            ৳ {product.price}
          </Typography>
        </Stack>
      </Box>

      {action && <Box display="flex" gap={1} mt={2}>
        <ProductQuickViewButton />
        <Button variant="soft" color="primary" fullWidth>
          Add to Cart
        </Button>
      </Box>}
    </Box>
  );
};
