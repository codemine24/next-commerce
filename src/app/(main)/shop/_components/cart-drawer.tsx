"use client";

import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { OptimizeImage } from "@/components/optimize-image";
import { useCart } from "@/hooks/use-cart";
import { CloseIcon } from "@/icons/close";
import { DeleteIcon } from "@/icons/delete-icon";
import { BORDER_RADIUS } from "@/theme";
import { currencyFormatter } from "@/utils/currency-formatter";
import { makeImageUrl } from "@/utils/helper";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { cart, removeFromCart } = useCart();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 500,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: "background.default",
        }}
      >
        {/* Header */}
        <Box sx={{ p: 3, pb: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid"
            borderColor="divider"
            pb={2}
          >
            <Typography variant="h3">Your Cart</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* Product List */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
          {cart?.cart_items?.map((cart_item) => (
            <Stack
              key={cart_item.id}
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ mb: 2 }}
            >
              <OptimizeImage
                src={makeImageUrl(cart_item.product.thumbnail)}
                alt={cart_item.product.name}
                width={60}
                height={60}
              />

              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" mb={1}>
                  {cart_item.product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: TK <Typography component="span" fontWeight={600}>{currencyFormatter(cart_item.product.price)}</Typography>
                </Typography>
              </Box>
              <IconButton
                onClick={() => removeFromCart(cart_item.id)}
                sx={{
                  border: "1px solid",
                  borderColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.3),
                  color: "text.secondary",
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                    borderColor: (theme) =>
                      alpha(theme.palette.error.main, 0.3),
                  },
                  "&:hover svg": {
                    color: "error.light",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
        </Box>

        <Box sx={{ p: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              mb: 2,
              pt: 2,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="body1">Subtotal:</Typography>
            <Typography variant="h6">${cart.cart_total}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              variant="contained"
              component={Link}
              href="/cart"
              sx={{
                whiteSpace: "nowrap",
                bgcolor: "primary",
                color: "common.white",
                borderRadius: BORDER_RADIUS.default,
              }}
            >
              View Cart
            </Button>

            <Button
              fullWidth
              variant="contained"
              component={Link}
              href="/checkout"
              sx={{
                whiteSpace: "nowrap",
                bgcolor: "common.black",
                color: "common.white",
                borderRadius: BORDER_RADIUS.default,
              }}
            >
              Checkout
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};
