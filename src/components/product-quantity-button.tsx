"use client";

import { buttonBaseClasses } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import { MinusIcon } from "@/icons/minus";
import { PlusIcon } from "@/icons/plus";

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
          borderColor: "divider",
          fontSize: 16,
        },
        // '&.Mui-disabled': {
        //   '& .MuiButton-root': {
        //     borderColor: 'grey',
        //     color: 'divider',
        //   },
        // },
      }}
    >
      <Button
        onClick={onRemove}
        disabled={qty <= 1}
      >
        <MinusIcon />
      </Button>

      <Button color="inherit" sx={{ cursor: "default" }}>{qty}</Button>

      <Button onClick={onAdd}>
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
};