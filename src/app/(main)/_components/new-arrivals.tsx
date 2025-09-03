import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import OptimizeImage from "@/components/ui/optimize-image";
import { SectionTitle } from "./section-title";

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
];

export const NewArrivals = () => {
    return (
        <Box component="section" py={5}>
            <SectionTitle title="New Arrivals" href="/shop" />
            <Grid container spacing={2}>
                {Products.map((product) => (
                    <Grid
                        key={product.id}
                        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        bgcolor="background.paper"
                    >
                        <OptimizeImage
                            src="assets/product.svg"
                            alt={product.name}
                            height={300}
                            imageStyle={{ objectFit: "contain" }}
                        />

                        <Box p={2} mt={2}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                {product.name}
                            </Typography>

                            <Box display="flex" gap={1} alignItems="center" mt={2}>
                                <Typography variant="h4">{product.discount_price}</Typography>
                                <Typography variant="h6" fontWeight={400} color="text.secondary" sx={{ textDecoration: "line-through" }}>{product.price}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};