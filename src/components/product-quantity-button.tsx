"use client";

import { Button, buttonBaseClasses, ButtonGroup } from "@mui/material";

type ProductQuantityButtonProps = {
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
};

export const ProductQuantityButton = ({
  qty,
  onAdd,
  onRemove,
}: ProductQuantityButtonProps) => {
  return (
    <ButtonGroup
      variant="outlined"
      aria-label="product quantity button group"
      sx={{
        [`& .${buttonBaseClasses.root}`]: {
          width: 48,
          height: 48,
          borderColor: "#E6F2EE",
          fontSize: 16,
        },
      }}
    >
      <Button
        onClick={onRemove}
        disabled={qty <= 1}
        sx={{
          "&:hover": { borderRightColor: "#E6F2EE !important" },
          [`& .${buttonBaseClasses.disabled}`]: { borderColor: "#E6F2EE" },
          "&:disabled": { borderColor: "#E6F2EE" },
        }}
      >
        -
      </Button>

      <Button
        disabled
        sx={{
          "&:disabled": {
            color: "#222625",
            borderColor: "#E6F2EE",
          },
        }}
      >
        {qty}
      </Button>

      <Button onClick={onAdd} sx={{ borderColor: "#E6F2EE" }}>
        +
      </Button>
    </ButtonGroup>
  );
};
