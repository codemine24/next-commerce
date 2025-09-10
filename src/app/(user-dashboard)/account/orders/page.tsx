import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { OrderTable } from "./_components/order-table";

const orders = [
    {
        id: "1",
        order_id: "ORD000001",
        order_status: "PENDING",
        payment_status: "PENDING",
        payable_amount: 100,
        created_at: "2023-01-01",
        delivery_method: "Courier",
    },
    {
        id: "2",
        order_id: "ORD000002",
        order_status: "CONFIRMED",
        payment_status: "PAID",
        payable_amount: 250,
        created_at: "2023-01-05",
        delivery_method: "Home_Delivery",
    },
    {
        id: "3",
        order_id: "ORD000003",
        order_status: "SHIPPED",
        payment_status: "PAID",
        payable_amount: 450,
        created_at: "2023-02-10",
        delivery_method: "Pickup_Point",
    },
    {
        id: "4",
        order_id: "ORD000004",
        order_status: "DELIVERED",
        payment_status: "PAID",
        payable_amount: 300,
        created_at: "2023-03-15",
        delivery_method: "Courier",
    },
    {
        id: "5",
        order_id: "ORD000005",
        order_status: "CANCELLED",
        payment_status: "REFUNDED",
        payable_amount: 150,
        created_at: "2023-04-01",
        delivery_method: "Home_Delivery",
    },
    {
        id: "6",
        order_id: "ORD000006",
        order_status: "RETURNED",
        payment_status: "REFUNDED",
        payable_amount: 180,
        created_at: "2023-04-20",
        delivery_method: "Courier",
    },
    {
        id: "7",
        order_id: "ORD000007",
        order_status: "PENDING",
        payment_status: "PENDING",
        payable_amount: 220,
        created_at: "2023-05-05",
        delivery_method: "Pickup_Point",
    },
    {
        id: "8",
        order_id: "ORD000008",
        order_status: "CONFIRMED",
        payment_status: "PAID",
        payable_amount: 500,
        created_at: "2023-06-12",
        delivery_method: "Courier",
    },
    {
        id: "9",
        order_id: "ORD000009",
        order_status: "DELIVERED",
        payment_status: "PAID",
        payable_amount: 120,
        created_at: "2023-07-01",
        delivery_method: "Home_Delivery",
    },
    {
        id: "10",
        order_id: "ORD000010",
        order_status: "CANCELLED",
        payment_status: "PENDING",
        payable_amount: 75,
        created_at: "2023-08-18",
        delivery_method: "Courier",
    },
];

export default function OrdersPage() {
    return (
        <Box>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Product Orders
            </Typography>

            <OrderTable orders={orders} />
        </Box>
    );
}