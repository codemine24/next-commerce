"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        width: 110,
        height: 45,
        bgcolor: "transparent",
      }}
    >
      <IconButton
        onClick={onRemove}
        disabled={qty <= 1}
        sx={{
          borderRadius: 0,
          width: 30,
          color: "text.secondary",
        }}
      >
        -
      </IconButton>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          borderLeft: "1px solid",
          borderRight: "1px solid",
          borderColor: "divider",
          height: "100%",
        }}
      >
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{ color: "text.secondary" }}
        >
          {qty}
        </Typography>
      </Box>

      <IconButton
        onClick={onAdd}
        disabled={false}
        sx={{
          borderRadius: 0,
          width: 30,
          color: "text.secondary",
        }}
      >
        +
      </IconButton>
    </Paper>
  );
};
