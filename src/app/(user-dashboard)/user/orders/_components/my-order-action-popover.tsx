"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import React, { useState } from "react";

import { DotVerticalIcon } from "@/icons/dot-vertical";
import { EyeIcon } from "@/icons/eye";
import { IOrder } from "@/interfaces/order";

import { OrderDetailsDialog } from "./order-details-dialog";

interface BrandActionPopoverProps {
  item: IOrder;
}

export const MyOrderActionPopover = ({ item }: BrandActionPopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openOrderDetailsModal, setOpenOrderDetailsModal] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenOrderDetailsModal(false);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <DotVerticalIcon />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box width={200} display="flex" flexDirection="column" p={0.5}>
          <Button
            startIcon={<EyeIcon />}
            variant="text"
            color="inherit"
            onClick={() => setOpenOrderDetailsModal(true)}
            sx={{
              pl: 2,
              textTransform: "none",
              justifyContent: "flex-start",
              fontSize: ".85em",
            }}
          >
            View Details
          </Button>
        </Box>
      </Popover>

      <OrderDetailsDialog
        open={openOrderDetailsModal}
        item={item}
        onClose={handleClose}
      />
    </>
  );
};
