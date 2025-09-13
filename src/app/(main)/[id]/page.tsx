import { BoxContainer } from "@/components/box-container";
import Typography from "@mui/material/Typography";
import { ProductCarousel } from "./_components/product-carousel";
import Grid from "@mui/material/Grid";
import { ProductInfo } from "./_components/product-info";
import { ProductDetailInfo } from "./_components/product-detail-info";

const images = [
  "https://placehold.co/600x400/png",
  "https://placehold.co/800x400/png",
  "https://placehold.co/600x400/png",
  "https://placehold.co/600x400/png",
  "https://placehold.co/600x400/png",
  "https://placehold.co/600x400/png",
  "https://placehold.co/600x400/png",
];

const ProductDetail = () => {
  return (
    <BoxContainer>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Product Detail
      </Typography>
      {/* Product Image & Info */}
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ProductCarousel images={images} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ProductInfo open={false} onClose={() => {}} />
        </Grid>
      </Grid>

      {/* Product Detail Info */}
      <ProductDetailInfo />
    </BoxContainer>
  );
};

export default ProductDetail;
