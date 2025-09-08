import { OrdersIcon } from "@/icons/orders";
import { WishListIcon } from "@/icons/wish-list";

export const USER_NAVIGATION = [
    {
        title: "DASHBOARD",
        list: [
            { icon: <OrdersIcon fontSize="small" />, path: "/account/orders", name: "Orders" },
            { icon: <WishListIcon fontSize="small" />, path: "/account/wish-list", name: "Wishlist" },
        ]
    },
    {
        title: "ACCOUNT SETTINGS",
        list: [
            { icon: "", path: "/account/profile", name: "Profile Info" },
            { icon: "", path: "/account/address", name: "Addresses" },
            { icon: "", path: "/account/payment-methods", name: "Payment Methods" }
        ]
    }
];