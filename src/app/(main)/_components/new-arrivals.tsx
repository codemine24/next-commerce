import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SectionTitle } from "./section-title";
import { ProductCard } from "../shop/_components/product-card";

const Products = [
    {
        id: "1",
        name: "Bar Cabinet With Integrated Lighting",
        slug: "product-1",
        thumbnail: "",
        price: 100,
        discount_price: 50,
    },
    {
        id: "2",
        name: "Bar Cabinet With Integrated Lighting",
        slug: "product-2",
        thumbnail: "",
        price: 200,
        discount_price: 100,
    },
];

export const NewArrivals = () => {
    return (
        <Box component="section" py={5}>
            <SectionTitle title="New Arrivals" href="/shop" />
            <Grid container spacing={2}>
                {Products.map((product) => (
                    <Grid
                        key={product.id}
                        size={{ xs: 6, md: 4, lg: 3 }}
                    >
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};