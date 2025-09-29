import { Stack } from "@mui/material";
import { Typography } from "@mui/material";

import { Product } from "@/interfaces/product";
import { currencyFormatter } from "@/utils/currency-formatter";

export const ProductPrice = ({ product }: { product: Product }) => {
  if (product?.discount_price) {
    return (
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3" sx={{ fontWeight: 500, fontSize: 20 }}>
          {currencyFormatter(product?.discount_price)}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            textDecoration: "line-through",
            color: "#A4B2AE",
            fontSize: 20,
            fontWeight: 500,
          }}
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
