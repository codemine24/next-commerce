import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ProductCard } from "./product-card";
import { FilterApplied } from "./filter-applied";

const Products = [
    {
        id: "1",
        name: "Product 1",
        slug: "product-1",
        thumbnail: "",
        price: 100,
        discount_price: 50,
    },
    {
        id: "2",
        name: "Product 2",
        slug: "product-2",
        thumbnail: "",
        price: 200,
        discount_price: 100,
    },
]

export const AllProducts = () => {
    return (
        <Box flex={1}>
            <FilterApplied />
            <Grid container spacing={2}>
                {Products.map((product) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, }} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};