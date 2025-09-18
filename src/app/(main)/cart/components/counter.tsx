"use client";

import { alpha, Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";

import { BORDER_RADIUS } from "@/theme";

interface CounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  initialValue = 1,
  min = 1,
  max = 99,
  onChange,
}) => {
  const [count, setCount] = useState(initialValue);

  const handleDecrease = () => {
    if (count > min) {
      const newValue = count - 1;
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  const handleIncrease = () => {
    if (count < max) {
      const newValue = count + 1;
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <ButtonGroup
      variant="outlined"
      aria-label="Quantity counter"
      sx={{
        borderRadius: "10px",
        "& .MuiButtonBase-root": {
          border: "1px solid #E6F2EE",
          color: "text.primary",
          fontSize: 16,
          fontWeight: 400,
        },
      }}
    >
      <Button
        sx={{
          borderRadius: BORDER_RADIUS.default,
          "&:hover": {
            bgcolor: alpha("#ff0000", 0.1),
            color: "#ff0000",
          },
        }}
        onClick={handleDecrease}
      >
        -
      </Button>
      <Button sx={{ width: "40px" }}>{count}</Button>
      <Button
        sx={{
          borderRadius: BORDER_RADIUS.default,
          "&:hover": {
            bgcolor: alpha("#08996B", 0.1),
            color: "#08996B",
          },
        }}
        onClick={handleIncrease}
      >
        +
      </Button>
    </ButtonGroup>
  );
};

export default Counter;
