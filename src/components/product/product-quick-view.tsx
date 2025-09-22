import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { ProductCarousel } from "@/components/product/product-carousel";
import { ProductInfo } from "@/components/product/product-info";
import { CloseIcon } from "@/icons/close";
import { Product } from "@/interfaces/product";

import { AnimatedDialog } from "../dialog/animate-dialog";

const images = [
  "https://placehold.co/600x400/png",
  "https://placehold.co/800x400/png",
  "https://placehold.co/600x400/png",
  "https://placehold.co/600x400/png",
  "https://placehold.co/600x400/png",
  "https://placehold.co/600x400/png",
  "https://placehold.co/600x400/png",
];

interface ProductQuickViewProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

export const ProductQuickView = ({ open, onClose, product }: ProductQuickViewProps) => {
  return (
    <AnimatedDialog maxWidth="md" fullWidth onClose={onClose} open={open}>
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          overflowY: "auto",
        }}
      >
        <CloseIcon
          onClick={onClose}
          sx={{ position: "absolute", top: 16, right: 16, cursor: "pointer", zIndex: 10 }}
        />
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductCarousel images={images} thumbDirection="vertical" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductInfo product={product} />
          </Grid>
        </Grid>
      </Box>
    </AnimatedDialog>
  );
};
