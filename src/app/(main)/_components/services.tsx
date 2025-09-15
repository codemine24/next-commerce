import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { PaymentCardIcon } from "@/icons/payment-card";
import { ShippingIcon } from "@/icons/shipping";
import { SupportIcon } from "@/icons/support";
import { TruckReturnIcon } from "@/icons/truck-return";

const content = [
  {
    id: "1",
    icon: <ShippingIcon fontSize="large" />,
    title: "Free Shipping",
    description: "On orders over $100",
  },
  {
    id: "2",
    icon: <PaymentCardIcon fontSize="large" />,
    title: "Secure Payment",
    description: "100% secure payment",
  },
  {
    id: "3",
    icon: <SupportIcon fontSize="large" />,
    title: "24/7 Support",
    description: "24/7 support available",
  },
  {
    id: "4",
    icon: <TruckReturnIcon fontSize="large" />,
    title: "Safe Returns",
    description: "Safe returns within 30 days",
  },
];

export const Services = () => {
  return (
    <Grid container spacing={2} py={10}>
      {content.map((item) => (
        <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            {item.icon}
            <Typography variant="h5">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
