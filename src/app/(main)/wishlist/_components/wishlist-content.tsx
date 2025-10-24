"use client";
import { Box, Button, Stack } from "@mui/material";
import React, { useState, useTransition } from "react";

import { removeFromWishlist } from "@/actions/wishlist";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { Wishlist } from "@/interfaces/wishlist";
import { toast } from "@/lib/toast-store";

import { SectionTitle } from "../../_components/section-title";

import { WishlistTable } from "./wishlist-table";

interface WishlistProps {
  wishList: Wishlist[];
}

const WishlistContent = ({ wishList }: WishlistProps) => {
  const [isPending, startTransition] = useTransition();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleClose = () => {
    setOpenConfirmModal(false);
  };

  const handleClearWishlist = async () => {
    const ids = wishList.map((item) => item.product.id);
    startTransition(async () => {
      const res = await removeFromWishlist(ids);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  const hasProducts = wishList.length > 0;

  return (
    <>
      <Box sx={{ my: 5 }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <SectionTitle title="Your Wishlist" sx={{ mb: 0 }} />
          {hasProducts && (
            <Button
              disabled={isPending}
              sx={{
                color: "primary.main",
              }}
              onClick={() => setOpenConfirmModal(true)}
            >
              {isPending ? "Clearing..." : "Clear Wishlist"}
            </Button>
          )}
        </Stack>
        <WishlistTable wishList={wishList} />
      </Box>

      <ConfirmDialog
        open={openConfirmModal}
        onClose={handleClose}
        title="Delete all wishlist"
        description="Are you sure you want to delete all wishlist?"
        onConfirm={handleClearWishlist}
        loading={isPending}
      />
    </>
  );
};

export default WishlistContent;
