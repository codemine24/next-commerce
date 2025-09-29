"use client";
import {
  alpha,
  Box,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from "@mui/material";
import { useState } from "react";


const CheckoutInfo = () => {
  const [delivery, setDelivery] = useState("home");

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
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CheckoutInfo;
