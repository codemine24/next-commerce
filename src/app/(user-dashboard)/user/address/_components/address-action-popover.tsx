"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import { useState, useTransition } from "react";

import { deleteCategory } from "@/actions/category";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DeleteIcon } from "@/icons/delete-icon";
import { DotVerticalIcon } from "@/icons/dot-vertical";
import { EditIcon } from "@/icons/edit";
import { Category } from "@/interfaces/category";
import { toast } from "@/lib/toast-store";
import { Address } from "@/interfaces/address";

// import { CategoryEditDialog } from "./category-edit-dialog";

interface AddressActionPopoverProps {
  address: Address;
}

export const AddressActionPopover = ({
  address,
}: AddressActionPopoverProps) => {
  const [loading, startTransition] = useTransition();
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenConfirmModal(false);
    setOpenEditModal(false);
  };

  console.log("Address", address.id);

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await deleteCategory([address.id]);
      console.log(address);

      if (res.success) {
        toast.success(res.message);
        handleClose();
      } else {
        toast.error(res.message);
      }
    });
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
            startIcon={<EditIcon />}
            variant="text"
            color="inherit"
            onClick={() => setOpenEditModal(true)}
            sx={{
              pl: 2,
              textTransform: "none",
              justifyContent: "flex-start",
            }}
          >
            Edit
          </Button>

          {/* Delete Button */}
          <Button
            startIcon={<DeleteIcon />}
            variant="text"
            color="error"
            onClick={() => setOpenConfirmModal(true)}
            sx={{
              pl: 2,
              textTransform: "none",
              justifyContent: "flex-start",
            }}
          >
            Delete
          </Button>
        </Box>
      </Popover>

      {openConfirmModal && (
        <ConfirmDialog
          open={openConfirmModal}
          onClose={handleClose}
          title="Delete Category"
          description="Are you sure you want to delete this category?"
          onConfirm={handleDelete}
          loading={loading}
        />
      )}

      {/* {openEditModal && (
        <CategoryEditDialog
          open={openEditModal}
          onClose={handleClose}
          category={category}
        />
      )} */}
    </>
  );
};
