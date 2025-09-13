import React, { useState } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

import { LockIcon } from "@/icons/lock-icon";
import { CreditCardIcon } from "@/icons/credit-card-icon";
import { PaymentsIcon } from "@/icons/payments-icon";

type Country =
  | "Bangladesh"
  | "United States"
  | "United Kingdom"
  | "Canada"
  | "Australia";

const PaymentInfo = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [tabValue, setTabValue] = useState(0);
  const [country, setCountry] = useState<Country>("Bangladesh");

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setPaymentMethod(value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCountryChange = (event: SelectChangeEvent<Country>) => {
    setCountry(event.target.value as Country);
  };

  // Demo card images (replace with actual images in a real implementation)
  const CardIcons = () => (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      <Box
        sx={{ width: 30, height: 20, bgcolor: "#1976d2", borderRadius: 1 }}
      />
      <Box
        sx={{ width: 30, height: 20, bgcolor: "#d32f2f", borderRadius: 1 }}
      />
      <Box
        sx={{ width: 30, height: 20, bgcolor: "#2e7d32", borderRadius: 1 }}
      />
    </Box>
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 500, p: 2 }}>
      {/* Radio buttons for payment method selection */}
      <RadioGroup
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
        sx={{ mb: 2 }}
      >
        <FormControlLabel
          value="cash"
          control={<Radio />}
          label="Cash on delivery"
        />
        <FormControlLabel value="card" control={<Radio />} label="Card" />
        <FormControlLabel
          value="cashApp"
          control={<Radio />}
          label="Cash App Pay"
        />
      </RadioGroup>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<CreditCardIcon />} iconPosition="start" label="Card" />
          <Tab
            icon={<PaymentsIcon />}
            iconPosition="start"
            label="Cash App Pay"
          />
        </Tabs>
      </Box>

      {/* Tab content - same for both tabs */}
      <Box sx={{ pt: 2 }}>
        {/* Secure checkout text */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "primary.main",
            mb: 2,
          }}
        >
          <LockIcon sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2">
            Secure, fast checkout with Link
          </Typography>
        </Box>

        {/* Card number field */}
        <TextField
          fullWidth
          label="Card number"
          placeholder="1234 1234 1234 1234"
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CardIcons />
              </InputAdornment>
            ),
          }}
        />

        {/* Expiration date and security code fields */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Expiration date"
            placeholder="MM / YY"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreditCardIcon sx={{ color: "action.active" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Security code"
            placeholder="CVC"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreditCardIcon sx={{ color: "action.active" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Country selection */}
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select
            value={country}
            label="Country"
            onChange={handleCountryChange}
          >
            <MenuItem value="Bangladesh">Bangladesh</MenuItem>
            <MenuItem value="United States">United States</MenuItem>
            <MenuItem value="United Kingdom">United Kingdom</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="Australia">Australia</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default PaymentInfo;
