import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const Products = [
    {
        id: "1",
        name: "Iphone 15 Pro",
        description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        slug: "product-1",
        price: 100,
        discount_price: 50,
    },
    {
        id: "2",
        name: "Iphone 15 Pro",
        description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        slug: "product-2",
        price: 200,
        discount_price: 100,
    },
];

export const FeaturedProducts = () => {
    return (
        <Grid
            size={{ xs: 12, lg: 4 }}
            display="flex"
            flexDirection="column"
            gap={2}
        >
            {Products.map((product) => (
                <Box
                    key={product.id}
                    display="flex"
                    gap={2}
                    p={2}
                    height={200}
                    bgcolor="background.paper"
                >
                    <Box flex={1}>
                        <Typography variant="h5" fontWeight={600} gutterBottom>{product.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                        <Typography variant="body2" mt={3} fontWeight={600}>Limited Time Offer</Typography>
                        <Box display="flex" gap={1} alignItems="center" mt={2}>
                            <Typography variant="h4" fontWeight={500}>TK {product.discount_price}</Typography>
                            <Typography variant="h6" fontWeight={400} sx={{ textDecoration: "line-through" }}>{product.price}</Typography>
                        </Box>
                    </Box>
                    <Box width={150}>
                        <Image
                            src="/assets/product.jpg"
                            alt={product.name}
                            width={150}
                            height={150}
                        />
                    </Box>
                </Box>
            ))}
        </Grid>
    );
}