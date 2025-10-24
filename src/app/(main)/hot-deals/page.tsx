import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { Suspense } from "react";

import { getProducts } from "@/actions/product";
import { BoxContainer } from "@/components/box-container";
import { NotDataFound } from "@/components/not-data-found";
import { Pagination } from "@/components/pagination";
import { Product } from "@/interfaces/product";

import { ProductCard } from "../shop/_components/product-card";

export default async function HotDeals() {
    const products = await getProducts({ is_hot_deal: true });

    if (products.data.length === 0) {
        return (
            <NotDataFound
                sx={{ mt: 10 }}
                message="No products found"
                action={<Button
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
        )
    }

    return (
        <BoxContainer sx={{ pt: 2 }}>
            <Suspense fallback={<div>Loading...</div>}>
                <Grid container spacing={2}>
                    {products.data.map((product: Product) => (
                        <Grid size={{ xs: 6, md: 4 }} key={product.id}>
                            <ProductCard product={product} action={true} />
                        </Grid>
                    ))}
                </Grid>

                <Box p={2}>
                    <Pagination page={products.meta.page} total={products.meta.total} limit={products.meta.limit} />
                </Box>
            </Suspense>
        </BoxContainer>
    );
}