import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade"
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";

import { ProductCarousel } from "@/components/product/product-carousel";
import { ProductInfo } from "@/components/product/product-info";
import { CloseIcon } from "@/icons/close";
import { Product } from "@/interfaces/product";

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
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={open} timeout={500}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: "80vw" },
            maxWidth: "950px",
            maxHeight: "90vh",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            p: 3,
            overflowY: "auto",
          }}
        >
          <CloseIcon
            onClick={onClose}
            sx={{ position: "absolute", top: 16, right: 16, cursor: "pointer" }}
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
      </Fade>
    </Modal>
  );
};
