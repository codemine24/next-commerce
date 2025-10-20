"use client";
import { Box, Button, Stack } from "@mui/material";
import React, { useTransition } from "react";

import { removeFromWishlist } from "@/actions/wishlist";
import { Wishlist } from "@/interfaces/wishlist";
import { toast } from "@/lib/toast-store";

import { SectionTitle } from "../../_components/section-title";

import { WishlistTable } from "./wishlist-table";

interface WishlistProps {
  wishList: Wishlist[];
}

const WishlistContent = ({ wishList }: WishlistProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClearWishlist = async () => {

    const ids = wishList.map((item) => item.product.id);
    startTransition(async () => {
     const res=  await removeFromWishlist(ids);
      if (res.success) {
        toast.success(res.message);
      }else{
        toast.error(res.message);
      }
    } )
   
  };
  
  const hasProducts = wishList.length > 0;

  console.log(
    "wishList is",
    wishList.map((item) => item.product.id)
  );

  return (
    <Box sx={{ my: 5 }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <SectionTitle title="Your Wishlist" sx={{ mb: 0 }} />
        {hasProducts && (
          <Button
            disabled={isPending}
            sx={{
              color: "primary.main",
            }}
            onClick={handleClearWishlist}
          >
            {isPending ? "Clearing..." : "Clear Wishlist"}
          </Button>
        )}
      </Stack>
      <WishlistTable wishList={wishList} />
    </Box>
  );
};

export default WishlistContent;