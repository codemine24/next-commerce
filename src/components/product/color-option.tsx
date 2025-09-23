"use client";

import { IconButton } from "@mui/material";

import { CheckRounded } from "@/icons/check-rounded";

interface ColorOptionProps {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ColorOption = ({
  color,
  isSelected,
  onClick,
}: ColorOptionProps) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        bgcolor: color,
        transition: "all 0.3s ease",
        border: isSelected ? `5px solid ${color}` : "5px solid transparent",
        transform: isSelected ? "scale(1.2)" : "none",
        "&:hover": { bgcolor: color },
      }}
    >
      {isSelected && (
        <CheckRounded
          sx={{
            color: "#fff",
            fontSize: 30,
          }}
        />
      )}
    </IconButton>
  );
};
