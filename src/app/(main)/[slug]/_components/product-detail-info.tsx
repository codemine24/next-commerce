import Box from "@mui/material/Box";
import { Product } from "@prisma/client";

import { AskQuestion } from "../../shop/_components/ask-question";

import { ProductDescription } from "./product-description";
import { ProductDetailInfoNavbar } from "./product-detail-info-navbar";
import { ProductQuestions } from "./product-question";
import { ProductReviews } from "./product-reviews";
import { ProductSpecification } from "./product-specifications";
import { ProductVideo } from "./product-video";
import { SimilarProducts } from "./similar-products";

export const ProductDetailInfo = ({ product }: { product: Product }) => {
  return (
    <Box mt={10}>
      <Box my={2} display="flex" flexDirection="column" rowGap={3}>
        <SimilarProducts />
        <ProductDetailInfoNavbar />
        <ProductDescription description={product?.description} />
        <ProductSpecification specification={product?.specification} />
        <ProductVideo videoUrl="" />
        <ProductReviews productId={product.id} />
        <ProductQuestions />
        <AskQuestion />
      </Box>
    </Box>
  );
};
