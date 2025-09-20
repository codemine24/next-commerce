import { Box, Button, Stack } from "@mui/material";
import React from "react";

import { SectionTitle } from "../../_components/section-title";

import { WishlistTable } from "./wishlist-table";
import { wishlistData } from "./wishlistData";

const Wishlist: React.FC = () => {
  const hasProducts = wishlistData.length > 0;

  return (
    <Box sx={{ my: 5 }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <SectionTitle title="Your Wishlist" sx={{ mb: 0 }} />
        {hasProducts && (
          <Button
            sx={{
              color: "primary.main",
            }}
          >
            Clear Wishlist Data
          </Button>
        )}
      </Stack>

      <WishlistTable products={wishlistData as any} />
    </Box>
  );
};

export default Wishlist;
