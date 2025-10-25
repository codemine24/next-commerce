"use client";


import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import { FilterListIcon } from "@/icons/filter-list";
import { Meta } from "@/interfaces/api";

import { ProductFilter } from "./product-filter";

export const ProductFilterSidebar = ({ meta }: { meta: Meta }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  if (isLargeScreen) return <ProductFilter meta={meta} />;

  return (
    <Box>
      <Button
        onClick={() => setOpen(true)}
        color="inherit"
        variant="outlined"
        startIcon={<FilterListIcon />}
        sx={{ borderColor: "divider" }}
      >
        Filter
      </Button>

      <Drawer anchor="left" open={open} onClose={onClose}>
        <ProductFilter meta={meta} />
      </Drawer>
    </Box>
  )
};