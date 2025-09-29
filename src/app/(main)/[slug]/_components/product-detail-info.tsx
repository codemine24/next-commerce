import Box from "@mui/material/Box";
import { Product } from "@prisma/client";

import { AskQuestion } from "../../shop/_components/ask-question";
import Details from "../../shop/_components/details";
import Specification from "../../shop/_components/specification";

import { ProductDetailInfoNavbar } from "./product-detail-info-navbar";
import { ProductQuestions } from "./product-question";
import { ProductReviews } from "./product-reviews";
import { ProductVideo } from "./product-video";
import { SimilarProducts } from "./similar-products";

export const ProductDetailInfo = ({ product }: { product: Product }) => {
  return (
    <Box mt={10}>
      <Box my={2} display="flex" flexDirection="column" rowGap={3}>
        <SimilarProducts />
        <ProductDetailInfoNavbar />
        <Details />
        <Specification />
        {/* <ProductDetails /> */}
        {/* <ProductDescription description={product?.description} /> */}
        {/* <ProductSpecification specification={product?.specification} /> */}
        <ProductVideo videoUrl="" />
        <ProductReviews productId={product.id} />
        <ProductQuestions />
        <AskQuestion />
      </Box>
    </Box>
  );
};
