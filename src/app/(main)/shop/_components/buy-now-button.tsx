import { Button } from "@mui/material";
import React from "react";

import { BORDER_RADIUS } from "@/theme";

const BuyNowButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        fontSize: "1rem",
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
