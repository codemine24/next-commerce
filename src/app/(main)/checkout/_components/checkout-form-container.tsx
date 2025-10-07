"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { createOrderForGuestUser, createOrderForLoggedInUser } from "@/actions/order";
import { NotDataFound } from "@/components/not-data-found";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/lib/toast-store";
import { Order, orderSchema } from "@/zod/order-schema";

import { CheckoutForm } from "./checkout-form";

export const CheckoutFormContainer = () => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { cart, clearCart } = useCart();

    const methods = useForm<Order>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            address: {
                name: "",
                contact_number: "",
                email: "",
                address: "",
                postal_code: undefined,
                city: "",
                district: "",
                country: "",
                is_default: undefined,
            },
            payment_type: undefined,
            delivery_method: undefined,
            coupon_code: undefined,
            comment: undefined,
        },
    });

    const onSubmit = async (data: Order) => {
        const payload = {
            ...data,
            ...(!isAuthenticated && {
                order_items: cart.cart_items.map(item => ({
                    product_id: item.product.id,
                    quantity: item.quantity,
                }))
            })
        };

        const res = !isAuthenticated ? await createOrderForGuestUser(payload) : await createOrderForLoggedInUser(payload);

        if (!res.success) {
            toast.error(res.message);
            return;
        }

        toast.success(res.message);
        clearCart();
        router.replace("/payment-status");
    };

    if (cart?.cart_items.length === 0) {
        return (
            <NotDataFound
                message="Your cart is empty"
                action={
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        component={Link}
                        href="/"
                    >
                        Continue Shopping
                    </Button>
                }
            />
        )
    }

    return <CheckoutForm methods={methods} onSubmit={onSubmit} />;
};