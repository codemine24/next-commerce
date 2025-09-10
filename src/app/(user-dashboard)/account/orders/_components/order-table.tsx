import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";

import { VisibilityIcon } from "@/icons/visibility";

interface Order {
    id: string;
    order_id: string;
    order_status: string;
    payment_status: string;
    payable_amount: number;
    created_at: string;
    delivery_method: string;
}

export const OrderTable = ({ orders }: { orders: Order[] }) => {
    return (
        <TableContainer component={Box} border={1} borderBottom={0} borderColor="divider">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                                py: 0.5,
                                fontSize: 13,
                                backgroundColor: "background.paper"
                            }}
                        >
                            Order ID
                        </TableCell>
                        <TableCell
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                                py: 0.5,
                                fontSize: 13,
                                backgroundColor: "background.paper"
                            }}
                        >
                            Status
                        </TableCell>
                        <TableCell
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                                py: 0.5,
                                fontSize: 13,
                                backgroundColor: "background.paper"
                            }}
                        >
                            Payment Status
                        </TableCell>
                        <TableCell
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                                py: 0.5,
                                fontSize: 13,
                                backgroundColor: "background.paper"
                            }}
                        >
                            Total Amount
                        </TableCell>
                        <TableCell
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                                py: 0.5,
                                fontSize: 13,
                                backgroundColor: "background.paper"
                            }}>
                            Date
                        </TableCell>
                        <TableCell
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                                py: 0.5,
                                fontSize: 13,
                                backgroundColor: "background.paper"
                            }}>
                            Delivery Method
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                                py: 0.5,
                                fontSize: 13,
                                backgroundColor: "background.paper"
                            }}
                        >
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order) => (
                        <TableRow key={order.order_id}>
                            <TableCell
                                sx={{
                                    py: 1,
                                    borderBottom: 1,
                                    borderTop: 0,
                                    borderColor: "divider",
                                    "&:hover": {
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                {order?.order_id}
                            </TableCell>
                            <TableCell sx={{ borderBottom: 1, borderTop: 0, borderColor: "divider", py: 1 }}>
                                <Chip
                                    size="small"
                                    label={order?.order_status}
                                    color="primary"
                                />
                            </TableCell>
                            <TableCell sx={{ borderBottom: 1, borderTop: 0, borderColor: "divider", py: 1 }}>
                                <Chip
                                    size="small"
                                    label={order?.payment_status}
                                    color="primary"
                                />
                            </TableCell>
                            <TableCell sx={{ borderBottom: 1, borderTop: 0, borderColor: "divider", py: 1 }}>
                                ৳ {order?.payable_amount.toLocaleString("en-BD")}
                            </TableCell>
                            <TableCell sx={{ borderBottom: 1, borderTop: 0, borderColor: "divider", py: 1 }}>
                                {new Date(order?.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell sx={{ borderBottom: 1, borderTop: 0, borderColor: "divider", py: 1, textTransform: "capitalize" }}>
                                {order?.delivery_method.toLowerCase().replace("_", " ")}
                            </TableCell>
                            <TableCell sx={{ borderBottom: 1, borderTop: 0, borderColor: "divider", py: 1 }}>
                                <Button
                                    size="small"
                                    variant="text"
                                    component={Link}
                                    href={`/account/my-orders/${order?.order_id}`}
                                    endIcon={<VisibilityIcon />}
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};