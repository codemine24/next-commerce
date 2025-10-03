import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { CloseIcon } from "@/icons/close";
import {
  alpha,
  IconButton,
  Stack,
  TableContainer,
  Typography,
} from "@mui/material";

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
    // <Table>
    //   <TableHead>
    //     <TableRow>
    //       <TableCell
    //         sx={{
    //           borderBottom: 1,
    //           borderColor: "divider",
    //           py: 0.5,
    //           fontSize: 13,
    //           backgroundColor: "background.paper",
    //         }}
    //       >
    //         Order ID
    //       </TableCell>
    //       <TableCell
    //         sx={{
    //           borderBottom: 1,
    //           borderColor: "divider",
    //           py: 0.5,
    //           fontSize: 13,
    //           backgroundColor: "background.paper",
    //         }}
    //       >
    //         Status
    //       </TableCell>
    //       <TableCell
    //         sx={{
    //           borderBottom: 1,
    //           borderColor: "divider",
    //           py: 0.5,
    //           fontSize: 13,
    //           backgroundColor: "background.paper",
    //         }}
    //       >
    //         Payment Status
    //       </TableCell>
    //       <TableCell
    //         sx={{
    //           borderBottom: 1,
    //           borderColor: "divider",
    //           py: 0.5,
    //           fontSize: 13,
    //           backgroundColor: "background.paper",
    //         }}
    //       >
    //         Total Amount
    //       </TableCell>
    //       <TableCell
    //         sx={{
    //           borderBottom: 1,
    //           borderColor: "divider",
    //           py: 0.5,
    //           fontSize: 13,
    //           backgroundColor: "background.paper",
    //         }}
    //       >
    //         Date
    //       </TableCell>
    //       <TableCell
    //         sx={{
    //           borderBottom: 1,
    //           borderColor: "divider",
    //           py: 0.5,
    //           fontSize: 13,
    //           backgroundColor: "background.paper",
    //         }}
    //       >
    //         Delivery Method
    //       </TableCell>
    //       <TableCell
    //         align="center"
    //         sx={{
    //           borderBottom: 1,
    //           borderColor: "divider",
    //           py: 0.5,
    //           fontSize: 13,
    //           backgroundColor: "background.paper",
    //         }}
    //       >
    //         Action
    //       </TableCell>
    //     </TableRow>
    //   </TableHead>
    //   <TableBody>
    //     {orders?.map((order) => (
    //       <TableRow key={order.order_id}>
    //         <TableCell
    //           sx={{
    //             py: 1,
    //             borderBottom: 1,
    //             borderTop: 0,
    //             borderColor: "divider",
    //             "&:hover": {
    //               textDecoration: "underline",
    //               cursor: "pointer",
    //             },
    //           }}
    //         >
    //           {order?.order_id}
    //         </TableCell>
    //         <TableCell
    //           sx={{
    //             borderBottom: 1,
    //             borderTop: 0,
    //             borderColor: "divider",
    //             py: 1,
    //           }}
    //         >
    //           <Chip size="small" label={order?.order_status} color="primary" />
    //         </TableCell>
    //         <TableCell
    //           sx={{
    //             borderBottom: 1,
    //             borderTop: 0,
    //             borderColor: "divider",
    //             py: 1,
    //           }}
    //         >
    //           <Chip
    //             size="small"
    //             label={order?.payment_status}
    //             color="primary"
    //           />
    //         </TableCell>
    //         <TableCell
    //           sx={{
    //             borderBottom: 1,
    //             borderTop: 0,
    //             borderColor: "divider",
    //             py: 1,
    //           }}
    //         >
    //           ৳ {order?.payable_amount.toLocaleString("en-BD")}
    //         </TableCell>
    //         <TableCell
    //           sx={{
    //             borderBottom: 1,
    //             borderTop: 0,
    //             borderColor: "divider",
    //             py: 1,
    //           }}
    //         >
    //           {new Date(order?.created_at).toLocaleDateString()}
    //         </TableCell>
    //         <TableCell
    //           sx={{
    //             borderBottom: 1,
    //             borderTop: 0,
    //             borderColor: "divider",
    //             py: 1,
    //             textTransform: "capitalize",
    //           }}
    //         >
    //           {order?.delivery_method.toLowerCase().replace("_", " ")}
    //         </TableCell>
    //         <TableCell
    //           sx={{
    //             borderBottom: 1,
    //             borderTop: 0,
    //             borderColor: "divider",
    //             py: 1,
    //           }}
    //         >
    //           <Button
    //             size="small"
    //             variant="text"
    //             component={Link}
    //             href={`/account/my-orders/${order?.order_id}`}
    //             endIcon={<VisibilityIcon />}
    //           >
    //             View
    //           </Button>
    //         </TableCell>
    //       </TableRow>
    //     ))}
    //   </TableBody>
    // </Table>

    <TableContainer sx={{ my: 4 }}>
      <Table
        sx={{
          minWidth: 650,
        }}
      >
        {/* Header */}
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>

        {/* Body */}
        <TableBody>
          {orders?.map((item) => (
            <TableRow key={item.id}>
              {/* Product */}
              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body1">{item.order_id}</Typography>
                </Stack>
              </TableCell>

              {/* Action */}
              <TableCell>
                <IconButton
                  onClick={() => {}}
                  sx={{
                    border: "1px solid",
                    borderColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.3),
                    color: "grey.400",
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                    "&:hover": {
                      bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                      borderColor: (theme) =>
                        alpha(theme.palette.error.main, 0.3),
                    },
                    "&:hover svg": {
                      color: "error.light",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </TableCell>

              {/* Quantity */}
              <TableCell>-</TableCell>

              {/* Unit Price */}
              <TableCell align="right">-</TableCell>

              {/* Total */}
              <TableCell align="right">-</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
