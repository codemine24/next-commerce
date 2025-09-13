import { HeartEmptyIcon } from "@/icons/heart-empty";
import { OrdersIcon } from "@/icons/orders";

export const USER_NAVIGATION = [
    {
        title: "DASHBOARD",
        list: [
            { icon: <OrdersIcon fontSize="small" />, path: "/account/orders", name: "Orders" },
            { icon: <HeartEmptyIcon fontSize="small" />, path: "/account/wish-list", name: "Wishlist" },
        ]
    },
    {
        title: "ACCOUNT SETTINGS",
        list: [
            { icon: "", path: "/account/profile", name: "Profile Info" },
            { icon: "", path: "/account/security", name: "Security" },
            { icon: "", path: "/account/address", name: "Addresses" },
            { icon: "", path: "/account/payment-methods", name: "Payment Methods" }
        ]
    }
];