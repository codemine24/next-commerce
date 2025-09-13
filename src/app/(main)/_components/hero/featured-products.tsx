import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Stack } from "@mui/material";
import { currencyFormatter } from "@/utils/currency-formatter";

const Products = [
  {
    id: "1",
    name: "Living Room Furniture Chair",
    description: "Gorem ipsum dolor sit amet, consectetur adipiscing elit.",
    slug: "product-1",
    price: 1000,
    discount_price: 900,
    imgUrl: "/images/featured_image_1.svg",
  },
  {
    id: "2",
    name: "Living Room Furniture Chair",
    description: "Gorem ipsum dolor sit amet, consectetur adipiscing elit.",
    slug: "product-2",
    price: 1100,
    discount_price: 900,
    imgUrl: "/images/featured_image_2.svg",
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
          gap={1}
          p={2}
          height={200}
          sx={{ border: "1px solid", borderColor: "divider" }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" color="text-primary" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>
            <Box display="flex" gap={4} alignItems="center">
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{ color: "text-primary" }}
              >
                {currencyFormatter(product.discount_price)}
              </Typography>
              <Typography
                variant="h5"
                fontWeight={400}
                sx={{ textDecoration: "line-through", color: "text.secondary" }}
              >
                {currencyFormatter(product.price)}
              </Typography>
            </Box>
          </Stack>

          <Image
            src={product.imgUrl}
            alt={product.name}
            width={300}
            height={150}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      ))}
    </Grid>
  );
};
