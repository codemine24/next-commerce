import { Stack } from "@mui/material";
import { Typography } from "@mui/material";

import { Product } from "@/interfaces/product";
import { currencyFormatter } from "@/utils/currency-formatter";

export const ProductPrice = ({ product }: { product: Product }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      px={2}
      minHeight={32}
      alignItems="center"
    >
      <Typography variant="h3" color="primary.main">
        {currencyFormatter(product?.price)}
      </Typography>
      {product.discount_price && (
        <Typography
          variant="body1"
          sx={{
            textDecoration: "line-through",
            color: "#A4B2AE",
          }}
        >
          {currencyFormatter(product?.discount_price)}
        </Typography>
      )}
    </Stack>
  );
};