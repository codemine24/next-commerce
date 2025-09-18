"use client";

import { useState } from "react";

import { CustomTab } from "@/components/custom-tab";
import { PRODUCT_NAV_ITEM } from "@/constants/product";
import { scrollToSection } from "@/utils/scroll-to-section";

export const ProductDetailInfoNavbar = () => {
    const [activeTab, setActiveTab] = useState(PRODUCT_NAV_ITEM[0].value);

    return (
        <CustomTab
            tabs={PRODUCT_NAV_ITEM}
            value={activeTab}
            onChange={(event, newValue) => {
                setActiveTab(newValue);
                scrollToSection(newValue);
            }}
        />
    )
}