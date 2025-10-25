"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { AnimatedDialog } from "@/components/dialog/animate-dialog";
import { useCart } from "@/hooks/use-cart";
import { CheckCircleFill } from "@/icons/check-circle-fill";
import { CloseIcon } from "@/icons/close";

export const CartDialog = () => {
    const { cart, openCartModal, setOpenCartModal } = useCart()

    const onClose = () => setOpenCartModal(false)

    console.log(cart.cart_items.reduce((total, item) => total + item.quantity, 0))

    return (
        <AnimatedDialog
            open={openCartModal}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            sx={{ overflowX: "hidden" }}
        >
            <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
                <CloseIcon />
            </IconButton>
            <DialogContent sx={{ p: 6 }}>
                <Box
                    display="flex"
                    alignItems="start"
                    justifyContent="space-between"
                    gap={2}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircleFill sx={{ height: 35, width: 35 }} color="primary" />
                        <Typography variant="h4">Your have added a product in your shopping cart</Typography>
                    </Box>

                    <Box
                        p={2}
                        pt={0}
                        display="flex"
                        alignItems="center"
                        gap={4}
                        border={1}
                        borderColor="divider"
                    >
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Typography variant="h5">cart quantity:</Typography>
                            <Typography variant="h5" fontWeight={600}>Cart total:</Typography>
                        </Box>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Typography variant="h5" fontWeight={600}>
                                {cart.cart_items.reduce((total, item) => total + item.quantity, 0)}
                            </Typography>
                            <Typography variant="h5" fontWeight={600}>{cart.cart_total}</Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Action Buttons */}
                <Stack direction="row" justifyContent="end" gap={3} mt={3}>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: "common.black" }}
                        component={Link}
                        href="/"
                    >
                        Continue Shopping
                    </Button>
                    <Button
                        variant="contained"
                        component={Link}
                        href="/checkout"
                    >
                        Confirm Order
                    </Button>
                </Stack>
            </DialogContent>
        </AnimatedDialog>
    )
}