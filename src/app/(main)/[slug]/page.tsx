import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { getProductBySlug } from "@/actions/product";
import { BoxContainer } from "@/components/box-container";
import { ProductCarousel } from "@/components/product/product-carousel";
import { ProductInfo } from "@/components/product/product-info";

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

type Params = Promise<{ slug: string }>

const ProductDetail = async ({ params }: { params: Params }) => {
  const { slug } = await params
  const product = await getProductBySlug(slug)

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
          <ProductInfo product={product.data} />
        </Grid>
      </Grid>

      {/* Product Detail Info */}
      <ProductDetailInfo product={product.data} />
    </BoxContainer>
  );
};

export default ProductDetail;
