"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  SelectChangeEvent,
} from "@mui/material";
import { LockIcon } from "@/icons/lock-icon";
import { CreditCardIcon } from "@/icons/credit-card-icon";
import { PaymentsIcon } from "@/icons/payments-icon"; // placeholder for Cash App Pay
import Image from "next/image";

type Country =
  | "Bangladesh"
  | "United States"
  | "United Kingdom"
  | "Canada"
  | "Australia";

const PaymentInfoV2: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("option1");
  const [tabIndex, setTabIndex] = useState(0);
  const [country, setCountry] = useState<Country>("Bangladesh");

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleCountryChange = (event: SelectChangeEvent<Country>) => {
    setCountry(event.target.value as Country);
  };

  // Tab Content
  const renderTabContent = () => (
    <Box sx={{ mt: 2 }}>
      {/* Secure checkout */}
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <LockIcon color="primary" fontSize="small" />
        <Typography variant="body2" color="primary">
          Secure, First checkout with link
        </Typography>
      </Box>

      {/* Card Number */}
      <TextField
        fullWidth
        label="Card number"
        placeholder="1-9"
        variant="outlined"
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {/* Replace with real logos */}
              <Image src="/demo-cards.png" alt="cards" width={50} height={24} />
            </InputAdornment>
          ),
        }}
      />

      {/* Expiration + Security */}
      <Box display="flex" gap={2}>
        <TextField
          fullWidth
          label="Expiration date"
          placeholder="MM / YY"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Security code"
          placeholder="CVC"
          variant="outlined"
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CreditCardIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Country Select */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Country</InputLabel>
        <Select value={country} onChange={handleCountryChange} label="Country">
          <MenuItem value="Bangladesh">Bangladesh</MenuItem>
          <MenuItem value="United States">United States</MenuItem>
          <MenuItem value="United Kingdom">United Kingdom</MenuItem>
          <MenuItem value="Canada">Canada</MenuItem>
          <MenuItem value="Australia">Australia</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Card variant="outlined" sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        {/* Radio buttons */}
        <RadioGroup
          row
          value={paymentMethod}
          onChange={handlePaymentChange}
          sx={{ mb: 2 }}
        >
          <FormControlLabel
            value="option1"
            control={<Radio />}
            label="Option 1"
          />
          <FormControlLabel
            value="option2"
            control={<Radio />}
            label="Option 2"
          />
        </RadioGroup>

        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab icon={<CreditCardIcon />} iconPosition="top" label="Card" />
          <Tab
            icon={<PaymentsIcon />}
            iconPosition="top"
            label="Cash App Pay"
          />
        </Tabs>

        {/* Tab Content */}
        {renderTabContent()}
      </CardContent>
    </Card>
  );
};

export default PaymentInfoV2;
