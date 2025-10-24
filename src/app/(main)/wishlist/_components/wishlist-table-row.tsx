"use client";
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useState, useTransition } from "react";

import { removeFromWishlist } from "@/actions/wishlist";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DeleteCircle } from "@/icons/delete-circle";
import { ShoppingCart } from "@/icons/shopping-cart";
import { Wishlist } from "@/interfaces/wishlist";
import { toast } from "@/lib/toast-store";
import { BORDER_RADIUS } from "@/theme";
import { currencyFormatter } from "@/utils/currency-formatter";
import { makeImageUrl } from "@/utils/helper";

const WishlistTableRow = ({ item }: { item: Wishlist }) => {
  const [isPending, startTransition] = useTransition();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);


  const handleClose = () => {
    setOpenConfirmModal(false);
  };

  const handleDeleteWishlist = (id: string) => {
    startTransition(async () => {
      const res = await removeFromWishlist([id]);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              component="img"
              src={makeImageUrl(item.product.thumbnail)}
              alt={item.product.name}
              sx={{
                width: 60,
                height: 60,
                objectFit: "cover",
              }}
            />
            <Typography>{item.product.name}</Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Typography>{currencyFormatter(item.product.price)}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{currencyFormatter(item.product.price)}</Typography>
        </TableCell>

        <TableCell align="center">
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button
              size="medium"
              startIcon={<ShoppingCart />}
              sx={{
                py: 1.5,
                borderRadius: BORDER_RADIUS.default,
                bgcolor: "#F7FCFB",
                color: "text.primary",
                "&:hover": { bgcolor: "#E6F2EE" },
              }}
            >
              Add to Cart
            </Button>
            <IconButton
              // onClick={() => handleDeleteWishlist(item.product.id)}
              onClick={() => setOpenConfirmModal(true)}
              sx={{
                bgcolor: "#F7FCFB",
                borderRadius: BORDER_RADIUS.default,
                border: "1px solid #E6F2EE",
                "&:hover": {
                  color: "#FF3030",
                  bgcolor: alpha("#FF3030", 0.1),
                },
              }}
            >
              <DeleteCircle />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      {openConfirmModal && (
        <ConfirmDialog
          open={openConfirmModal}
          onClose={handleClose}
          title="Delete Wishlist"
          description="Are you sure you want to delete this wishlist?"
          onConfirm={() => handleDeleteWishlist(item.product.id)}
          loading={isPending}
        />
      )}
    </>
  );
};

export default WishlistTableRow;
