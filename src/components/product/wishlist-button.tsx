import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import React from "react";

import { addToWishlist } from "@/actions/wishlist";
import { useAuth } from "@/hooks/use-auth";
import { Product } from "@/interfaces/product";
import { toast } from "@/lib/toast-store";

interface WishlistButtonProps {
  product: Product;
}

const WishlistButton = ({ product }: WishlistButtonProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToWishlist = async () => {
    if (!user) {
      toast.error("Please login to add wishlist");
      router.push("/login");
      return;
    }

    const res = await addToWishlist(product.id);
    if (res.success) {
      toast.success(res.message);
    }else{
      toast.error(res.message);
    }
  };
  
  return (
    <>
      <Button
        variant="contained"
        onClick={handleAddToWishlist}
        sx={{ height: 48, flexGrow: 1, bgcolor: "common.black" }}
      >
        Add to Wishlist
      </Button>
    </>
  );
};

export default WishlistButton;