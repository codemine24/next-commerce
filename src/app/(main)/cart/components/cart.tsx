import { Box, Typography, Button } from "@mui/material";
import React from "react";

import { cartData } from "./cart-data";
import CartTable from "./cart-table";

const Wishlist: React.FC = () => {
  const hasProducts = cartData.length > 0;

  return (
    <Box sx={{ my: 5 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={5}
      >
        <Typography variant="h2" fontWeight="">
          Your Wishlist
        </Typography>
        {hasProducts && (
          <Button
            sx={{
              color: "primary.100",
            }}
          >
            Clear Wishlist Data
          </Button>
        )}
      </Box>
      <CartTable />
    </Box>
  );
};

export default Wishlist;
