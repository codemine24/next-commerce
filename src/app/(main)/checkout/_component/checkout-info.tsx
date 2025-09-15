"use client";
import { CreditCardIcon } from "@/icons/credit-card-icon";
import { DollarIcon } from "@/icons/dollar-icon";
import { LockIcon } from "@/icons/lock-icon";
import { PaymentsIcon } from "@/icons/payments-icon";
import { BORDER_RADIUS } from "@/theme";
import {
  alpha,
  Box,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  ToggleButton,
  toggleButtonClasses,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const CheckoutInfo = () => {
  const [delivery, setDelivery] = useState("home");
  const [paymentOption, setPaymentOption] = useState("card");

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Stack gap={3}>
          <Card sx={{ p: 3, borderRadius: 1 }}>
            <Typography variant="h4" gutterBottom mb={2}>
              <Box
                component="span"
                sx={{
                  bgcolor: alpha("rgb(255, 0, 0)", 0.1),
                  color: "rgb(255, 0, 0)",
                  borderRadius: "50px",
                  width: "30px",
                  height: "30px",
                  display: "inline-block",
                  textAlign: "center",
                  lineHeight: "30px",
                  mr: 1,
                }}
              >
                3
              </Box>
              Delivery Method
            </Typography>
            <Divider />
            <Typography variant="h6" gutterBottom mt={2}>
              Select a delivery method
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
              >
                <FormControlLabel
                  value="home"
                  control={
                    <Radio
                      sx={{
                        color: "#A2369a",
                        "&.Mui-checked": {
                          color: "#A2369a",
                        },
                      }}
                    />
                  }
                  label="Home Delivery – 60৳"
                />
                <FormControlLabel
                  value="pickup"
                  control={
                    <Radio
                      sx={{
                        color: "#A2369a",
                        "&.Mui-checked": {
                          color: "#A2369a",
                        },
                      }}
                    />
                  }
                  label="Store Pickup – 0৳"
                />
                <FormControlLabel
                  value="express"
                  control={
                    <Radio
                      sx={{
                        color: "#A2369a",
                        "&.Mui-checked": {
                          color: "#A2369a",
                        },
                      }}
                    />
                  }
                  label="Request Express – 200৳"
                />
              </RadioGroup>
            </FormControl>
          </Card>
          <Card sx={{ p: 3, borderRadius: 1 }}>
            <Typography variant="h4" gutterBottom mb={2}>
              <Box
                component="span"
                sx={{
                  bgcolor: alpha("rgb(255, 0, 0)", 0.1),
                  color: "rgb(255, 0, 0)",
                  borderRadius: "50px",
                  width: "30px",
                  height: "30px",
                  display: "inline-block",
                  textAlign: "center",
                  lineHeight: "30px",
                  mr: 1,
                }}
              >
                4
              </Box>
              Delivery Method
            </Typography>
            <Divider />
            <Typography variant="h6" gutterBottom mt={2}>
              Select a delivery method
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
              >
                <FormControlLabel
                  value="home"
                  control={
                    <Radio
                      sx={{
                        color: "#A2369a",
                        "&.Mui-checked": {
                          color: "#A2369a",
                        },
                      }}
                    />
                  }
                  label="Home Delivery – 60৳"
                />
                <FormControlLabel
                  value="pickup"
                  control={
                    <Radio
                      sx={{
                        color: "#A2369a",
                        "&.Mui-checked": {
                          color: "#A2369a",
                        },
                      }}
                    />
                  }
                  label="Store Pickup – 0৳"
                />
                <FormControlLabel
                  value="express"
                  control={
                    <Radio
                      sx={{
                        color: "#A2369a",
                        "&.Mui-checked": {
                          color: "#A2369a",
                        },
                      }}
                    />
                  }
                  label="Request Express – 200৳"
                />
              </RadioGroup>
            </FormControl>
          </Card>
        </Stack>
      </Grid>

      {/* Payment Method */}
      <Grid size={{ xs: 12, md: 7 }}>
        <Stack>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <RadioGroup>
                <FormControlLabel
                  value="cod1"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: "#645cFF",
                        "&.Mui-checked": {
                          color: "#645cFF",
                        },
                      }}
                    />
                  }
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        border: "1px solid #8D9996",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: BORDER_RADIUS.default,
                        bgcolor: "#f3f4f6",
                      }}
                    >
                      <Box
                        component="span"
                        fontSize={30}
                        color="blue"
                        fontWeight={900}
                      >
                        Stripe
                      </Box>
                      <Divider orientation="vertical" sx={{ height: 30 }} />
                      <Box component="span">Stripe</Box>
                    </Box>
                  }
                  sx={{ mb: 2 }}
                />

                {/* Second Radio */}
                <FormControlLabel
                  value="cod2"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: "text.primary",
                        "&.Mui-checked": {
                          color: "text.primary",
                        },
                      }}
                    />
                  }
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        border: "1px solid #8D9996",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: BORDER_RADIUS.default,
                        bgcolor: "#f3f4f6",
                      }}
                    >
                      <Box component="span" fontSize={30} color="text.primary">
                        <DollarIcon />
                      </Box>
                      <Divider orientation="vertical" sx={{ height: 30 }} />
                      <Box component="span">Cash On Delivery</Box>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>

            {/* ---------------------------  */}
            {/* Toggle buttons */}
            <ToggleButtonGroup
              value={paymentOption}
              exclusive
              onChange={(e, val) => val && setPaymentOption(val)}
              fullWidth
              sx={{
                mb: 3,
                gap: 1,
                transition: "all 0.3s",
                "& .MuiToggleButton-root": {
                  fontWeight: 500,
                  borderRadius: 2,
                  py: 1.5,
                  border: "2px solid #ddd",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  color: "#0072E6 !important",
                },
                [`& .${toggleButtonClasses.selected}`]: {
                  border: "2px solid #0072E6",
                },
              }}
            >
              <ToggleButton value="card">
                <CreditCardIcon />
                Card
              </ToggleButton>
              <ToggleButton value="cashapp" sx={{}}>
                <PaymentsIcon sx={{}} />
                Cash App Pay
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Shared Content */}
            {paymentOption === "card" ? (
              <Box>
                {/* Secure checkout text */}
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <LockIcon color="primary" fontSize="small" />
                  <Typography variant="body2" color="primary">
                    Secure, First checkout with link
                  </Typography>
                </Box>

                {/* Card Number */}
                <TextField
                  fullWidth
                  label="Card Number"
                  placeholder="1234 1234 1234 1234"
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {/* Demo card logos */}
                        <Image
                          src="/demo-cards.png"
                          alt="cards"
                          width={60}
                          height={24}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            ) : (
              <Box>
                {/* Secure checkout text */}
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <LockIcon color="primary" fontSize="small" />
                  <Typography variant="body2" color="primary">
                    Secure, First checkout with links
                  </Typography>
                </Box>

                {/* Card Number */}
                <TextField
                  fullWidth
                  label="Card Number"
                  placeholder="1234 1234 1234 1234"
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {/* Demo card logos */}
                        <Image
                          src="/demo-cards.png"
                          alt="cards"
                          width={60}
                          height={24}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}
            {/* ---------------------------  */}
          </Card>
          {/* <PaymentInfo /> */}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CheckoutInfo;
