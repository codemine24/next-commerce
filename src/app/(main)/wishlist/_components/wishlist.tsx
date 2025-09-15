import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { wishlistData } from "./wishlistData";
import WishlistTable from "./wishlist-table";

const Wishlist: React.FC = () => {
  const hasProducts = wishlistData.length > 0;

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
      <WishlistTable products={wishlistData as any} />
    </Box>
  );
};

export default Wishlist;
