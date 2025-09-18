import Box from "@mui/material/Box";
import { Product } from "@prisma/client";

import { ProductDescription } from "./product-description";
import { ProductDetailInfoNavbar } from "./product-detail-info-navbar";
import { ProductQuestions } from "./product-question";
import { ProductReviews } from "./product-reviews";
import { ProductSpecification } from "./product-specifications";

export const ProductDetailInfo = ({ product }: { product: Product }) => {
    return (
        <Box mt={10}>
            <ProductDetailInfoNavbar />

            <Box my={2} display="flex" flexDirection="column" rowGap={5}>
                <ProductDescription description={product.description} />
                <ProductSpecification specification={product.specification} />
                <ProductReviews />
                <ProductQuestions />
            </Box>
        </Box>
    )
}