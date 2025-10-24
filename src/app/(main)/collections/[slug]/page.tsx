import Button from "@mui/material/Button";
import Link from "next/link";

import { getProducts } from "@/actions/product";
import { BoxContainer } from "@/components/box-container";
import { NotDataFound } from "@/components/not-data-found";

import { AllProducts } from "../../shop/_components/all-products";
import { ProductFilterDrawer } from "../../shop/_components/products-filter-drawer";


type Params = Promise<{ slug: string }>;

export default async function ProductPage({ params }: { params: Params }) {
    const { slug } = await params;
    const products = await getProducts({
        category: [slug],
    });

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
        <BoxContainer>
            <ProductFilterDrawer meta={products.meta} />
            <AllProducts products={products.data} meta={products.meta} />
        </BoxContainer>
    );
}