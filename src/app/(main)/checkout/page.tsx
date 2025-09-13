import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Stack,
  inputBaseClasses,
  Button,
} from "@mui/material";
import { BoxContainer } from "@/components/box-container";
import { BORDER_RADIUS } from "@/theme";
import CheckoutInfo from "./_component/checkout-info";
import CustomerInformation from "./_component/customer-information";
import OrderOverview from "./_component/OrderOverview";

const orderItems = [
  { id: 1, name: "Product 1", price: 500, total: 500 },
  { id: 2, name: "Product 2", price: 410, total: 820 },
  { id: 3, name: "Product 3", price: 300, total: 600 },
];
const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
const delivery = 60;
const total = subtotal + delivery;

const Checkout = () => {
  return (
    <BoxContainer>
      <Box sx={{ p: 4, px: 0 }}>
        {/* Title */}
        <Box>
          <Typography variant="h3" gutterBottom>
            Checkout
          </Typography>
        </Box>

        <Box sx={{ borderRadius: 2 }}>
          <Grid container spacing={4}>
            {/* Left Column  */}
            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{ border: "1px solid #ddd", p: 2, borderRadius: 2 }}
            >
              <CustomerInformation />
            </Grid>

            {/* Right Column */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" gutterBottom>
                Order Overview
              </Typography>
              <OrderOverview orderItems={orderItems} />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
                <Box sx={{ minWidth: 280 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ borderBottom: "1px solid #edeaea", mb: 1, pb: 1 }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      width="60%"
                      textAlign="right"
                    >
                      Subtotal:
                    </Typography>
                    <Typography variant="h6" fontWeight={600} color="red">
                      TK {subtotal}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ borderBottom: "1px solid #edeaea", mb: 1, pb: 1 }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      width="60%"
                      textAlign="right"
                    >
                      Home Delivery:
                    </Typography>
                    <Typography variant="h6" fontWeight={600} color="red">
                      TK {delivery}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ borderBottom: "1px solid #edeaea", pb: 1 }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      width="60%"
                      textAlign="right"
                    >
                      Total:
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="red">
                      TK {total}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
              <Stack
                direction="row"
                spacing={2}
                mb={4}
                sx={{
                  bgcolor: "background.paper",
                  p: 3,
                  borderRadius: BORDER_RADIUS.default,
                }}
              >
                <Stack direction="row" spacing={2} flex="1">
                  <TextField
                    fullWidth
                    placeholder="Promo / Coupon code"
                    size="small"
                    sx={{
                      [`& .${inputBaseClasses.root}`]: {
                        borderRadius: BORDER_RADIUS.default,
                      },
                      [`& .${inputBaseClasses.input}`]: {
                        p: "5px 14px",
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    sx={{
                      whiteSpace: "nowrap",
                      color: "blue",
                      border: "1px solid blue",
                      borderRadius: BORDER_RADIUS.default,
                    }}
                  >
                    Apply Coupon
                  </Button>
                </Stack>
                <Stack direction="row" spacing={2} flex="1">
                  <TextField
                    fullWidth
                    placeholder="Enter your gift voucher code here"
                    size="small"
                    sx={{
                      [`& .${inputBaseClasses.root}`]: {
                        borderRadius: BORDER_RADIUS.default,
                      },
                      [`& .${inputBaseClasses.input}`]: {
                        p: "5px 14px",
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    sx={{
                      whiteSpace: "nowrap",
                      color: "blue",
                      border: "1px solid blue",
                      borderRadius: BORDER_RADIUS.default,
                      px: "16px",
                    }}
                  >
                    Apply Voucher
                  </Button>
                </Stack>
              </Stack>
              <CheckoutInfo />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </BoxContainer>
  );
};

export default Checkout;
