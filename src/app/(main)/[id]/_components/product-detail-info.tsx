"use client";

import Box from "@mui/material/Box";
import { useState } from "react";

import { CustomTab } from "@/components/custom-tab";
import { scrollToSection } from "@/utils/scroll-to-section";

import { ProductDescription } from "./product-description";
import { ProductQuestions } from "./product-question";
import { ProductReviews } from "./product-reviews";
import { ProductSpecification } from "./product-specifications";

const TAB_ITEM = [
    { value: 'product-description', label: "Description" },
    { value: 'product-specifications', label: "Specifications" },
    { value: 'product-video', label: "Video" },
    { value: "product-reviews", label: "Rating & Reviews" },
    { value: 'product-qna', label: "QnA" }
]

export const ProductDetailInfo = () => {
    const [activeTab, setActiveTab] = useState(TAB_ITEM[0].value);

    return (
        <Box mt={10}>
            <CustomTab
                tabs={TAB_ITEM}
                value={activeTab}
                onChange={(event, newValue) => {
                    setActiveTab(newValue);
                    scrollToSection(newValue);
                }}
            />

            <Box my={2} display="flex" flexDirection="column" rowGap={5}>
                <ProductDescription description={"<p>lorem ipsum dolor sit amet consectetur adipisicing elit</p>"} />
                <ProductSpecification />
                <ProductReviews />
                <ProductQuestions />
            </Box>
        </Box>
    )
}