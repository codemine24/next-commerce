import { HeartEmptyIcon } from "@/icons/heart-empty";
import { OrdersIcon } from "@/icons/orders";

export const USER_NAVIGATION = [
    {
        title: "DASHBOARD",
        list: [
            { icon: <OrdersIcon fontSize="small" />, path: "/user/orders", name: "Orders" },
            { icon: <HeartEmptyIcon fontSize="small" />, path: "/user/wish-list", name: "Wishlist" },
        ]
    },
    {
        title: "ACCOUNT SETTINGS",
        list: [
            { icon: "", path: "/user/profile", name: "Profile Info" },
            { icon: "", path: "/user/security", name: "Security" },
            { icon: "", path: "/user/address", name: "Addresses" },
            { icon: "", path: "/user/payment-methods", name: "Payment Methods" }
        ]
    }
];