"use client";
import { Button } from "@mui/material";
import React from "react";
interface AddAddressButtonProps {
  variant?: "text" | "outlined" | "contained";
  onClick: () => void;
  children: React.ReactNode;
}

export const AddAddressButton = ({
  variant,
  onClick,
  children,
}: AddAddressButtonProps) => {
  return (
    <>
      <Button variant={variant} onClick={onClick}>
        {children}
      </Button>
    </>
  );
};
