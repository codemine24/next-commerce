import React from "react";
import { Box, Typography, Button } from "@mui/material";

const EmptyWishlist: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="70vh"
      textAlign="center"
      gap={4}
    >
      <Box
        sx={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          borderColor: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="/assets/images/wishlist/hugeicons_bubble-chat-favourite.svg"
          alt="Wishlist Empty"
          sx={{ width: 90, height: 90 }}
        />
      </Box>

      <Typography variant="h3" color="text.primary" fontWeight={300}>
        Your wishlist is empty!
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: "primary.main",
          fontSize: 16,
          fontWeight: 400,
          px: 15,
          "&:hover": { bgcolor: "primary.dark" },
        }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

export default EmptyWishlist;
