import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

import { getProducts } from "@/actions/product";
import { BoxContainer } from "@/components/box-container";
import { NotDataFound } from "@/components/not-data-found";
import { SearchParams } from "@/interfaces/common";

import { AllProducts } from "./_components/all-products";
import { ProductFilterSidebar } from "./_components/products-filter-sidebar";

type Params = Promise<{ slug: string }>;

export default async function ProductPage({ params, searchParams }: { params: Params, searchParams: Promise<SearchParams> }) {
    const { slug } = await params;
    const searchParamsData = await searchParams;

    const products = await getProducts({
        category: [slug],
        ...searchParamsData,
    });

    return (
        <BoxContainer>
            <Box display="flex" gap={2} flexDirection={{ xs: "column", lg: "row" }}>
                <ProductFilterSidebar meta={products.meta} />

                {/* If products are found */}
                {products.data.length > 0 && (
                    <AllProducts products={products.data} meta={products.meta} />
                )}

                {/* If no products are found */}
                {products.data.length === 0 && (
                    <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                        <NotDataFound
                            sx={{ mt: 10 }}
                            message="No products found"
                            action={
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    LinkComponent={Link}
                                    href="/"
                                    sx={{ mt: 3 }}
                                >
                                    Continue Shopping
                                </Button>
                            }
                        />
                    </Box>
                )}
            </Box>
        </BoxContainer>
    );
}