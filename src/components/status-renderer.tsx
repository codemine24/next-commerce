"use client";

import { alpha, Chip } from "@mui/material";

import { BORDER_RADIUS } from "@/theme";

interface StatusChipProps {
  status: string;
}

export const StatusRenderer = ({ status }: StatusChipProps) => {
  const normalized = status?.toUpperCase();

  // Map each status to label + custom color
  const getColor = () => {
    switch (normalized) {
      // Order-related statuses
      case "PENDING":
        return { label: "Pending", color: "#F57C00" };
      case "CONFIRMED":
        return { label: "Confirmed", color: "#0288D1" };
      case "PROCESSING":
        return { label: "Processing", color: "#7B1FA2" };
      case "SHIPPED":
        return { label: "Shipped", color: "#1976D2" };
      case "DELIVERED":
        return { label: "Delivered", color: "#2E7D32" };
      case "CANCELLED":
        return { label: "Cancelled", color: "#D32F2F" };
      case "REFUNDED":
        return { label: "Refunded", color: "#6A1B9A" };

      // Payment-related statuses
      case "DUE":
        return { label: "Due", color: "#F57C00" };
      case "PAID":
        return { label: "Paid", color: "#388E3C" };
      case "FAILED":
        return { label: "Failed", color: "#C62828" };

      // Fallback
      default:
        return { label: status, color: "#9E9E9E" };
    }
  };

  const { label, color } = getColor();

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        color: color,
        bgcolor: alpha(color, 0.1),
        border: `1px solid ${color}`,
        borderRadius: BORDER_RADIUS.default,
        "& .MuiChip-icon": { color },
      }}
    />
  );
};
