import OptimizeImage from "@/components/ui/image/optimize-image";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { SoftIconButton } from "@/components/ui/button/soft-icon-button";
import Button from "@mui/material/Button";
import { EyeIcon } from "@/icons/eye";

interface Product {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  discount_price: number;
}

export const ProductCard = async ({ product }: { product: Product }) => {
  return (
    <Card
      sx={{
        padding: { xs: 2, md: 3 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box component={Link} href={`/${product.slug}`}>
        <Box position="relative">
          <OptimizeImage
            src="assets/product.svg"
            alt={product.name}
            height={250}
          />
        </Box>

        <Box height={50}>
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

      <Box mt={2}>
        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "text.secondary" }}
          >
            ৳ {product.price}
          </Typography>
          <Typography variant="h6" fontWeight={500} color="primary.main">
            ৳{product.discount_price}
          </Typography>
        </Stack>
      </Box>

      <Box display="flex" gap={1} mt={2}>
        <SoftIconButton>
          <EyeIcon />
        </SoftIconButton>
        <Button variant="soft" color="primary" fullWidth>
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};
