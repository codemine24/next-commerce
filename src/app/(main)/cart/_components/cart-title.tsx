import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";

interface CartTitleProps {
  title: string;
}

const CartTitle: React.FC<CartTitleProps> = ({ title }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={5}
    >
      <Typography variant="h2" fontWeight="normal">
        {title}
      </Typography>

      <Button
        sx={{
          color: "primary.100",
        }}
      >
        Clear Wishlist Data
      </Button>
    </Box>
  );
};

export default CartTitle;
