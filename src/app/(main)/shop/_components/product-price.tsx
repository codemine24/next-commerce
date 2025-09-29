import { Stack } from "@mui/material";
import { Typography } from "@mui/material";

import { Product } from "@/interfaces/product";
import { currencyFormatter } from "@/utils/currency-formatter";

export const ProductPrice = ({ product }: { product: Product }) => {
  if (product?.discount_price) {
    return (
      <Stack direction="row" spacing={3} alignItems="center" mt={1}>
        <Typography variant="h3">
          {currencyFormatter(product?.discount_price)}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textDecoration: "line-through", color: "text.secondary" }}
        >
          {currencyFormatter(product?.price)}
        </Typography>
      </Stack>
    );
  }
  return (
    <Typography variant="h3">{currencyFormatter(product?.price)}</Typography>
  );
};
