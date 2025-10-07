import { Button } from "@mui/material";
import React from "react";

import { BORDER_RADIUS } from "@/theme";

const BuyNowButton = () => {
  return (
    <Button
      variant="soft"
      color="primary"
      sx={{
        fontSize: ".85rem",
        borderRadius: BORDER_RADIUS.default,
        flexGrow: 1,
        boxShadow: "none",
      }}
    >
      Buy Now
    </Button>
  );
};

export default BuyNowButton;
