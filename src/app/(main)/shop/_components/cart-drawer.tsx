"use client";

import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import { CloseIcon } from "@/icons/close";
import { DeleteIcon } from "@/icons/delete-icon";
import { useCart } from "@/providers/cart-provider";
import { BORDER_RADIUS } from "@/theme";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const router = useRouter();
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
            <Typography variant="h2">Your Cart</Typography>
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
              <Box
                component="img"
                src={
                  cart_item.product.thumbnail ||
                  "https://placehold.co/80x80/png"
                }
                alt={cart_item.product.name}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: BORDER_RADIUS.default,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" mb={1}>
                  {cart_item.product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: TK {cart_item.product.price}
                </Typography>
              </Box>
              <IconButton
                onClick={() => removeFromCart(cart_item.id)}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.secondary",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
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
            <Typography variant="body2">Subtotal:</Typography>
            <Typography variant="h4">$80.00</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                whiteSpace: "nowrap",
                bgcolor: "blue",
                color: "#fff",
                border: "1px solid blue",
                borderRadius: BORDER_RADIUS.default,
              }}
              onClick={() => {
                router.push("/cart");
                onClose();
              }}
            >
              View Cart
            </Button>

            <Button
              fullWidth
              variant="contained"
              sx={{
                whiteSpace: "nowrap",
                bgcolor: "blue",
                color: "#fff",
                border: "1px solid blue",
                borderRadius: BORDER_RADIUS.default,
              }}
            >
              Check Out
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};
