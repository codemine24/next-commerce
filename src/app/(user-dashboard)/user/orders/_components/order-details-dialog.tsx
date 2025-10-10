import {
  Box,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { AnimatedDialog } from "@/components/dialog/animate-dialog";
import { CloseIcon } from "@/icons/close";
import { IOrder } from "@/interfaces/order";
import { currencyFormatter } from "@/utils/currency-formatter";

interface OrderDetailsDialogProps {
  open: boolean;
  item: IOrder;
  onClose: () => void;
}

export const OrderDetailsDialog = ({
  open,
  onClose,
  item,
}: OrderDetailsDialogProps) => {
  return (
    <AnimatedDialog
      open={open}
      onClose={onClose}
      title="Order Details"
      maxWidth="sm"
      fullWidth
      transition="grow"
      sx={{ overflowX: "hidden" }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        sx={{ borderTop: 1, borderBottom: 1, borderColor: "divider" }}
      >
        <TableContainer sx={{ my: 4 }}>
          <Table
            sx={{
              minWidth: 450,
            }}
          >
            {/* Header */}
            <TableHead>
              <TableRow>
                <TableCell>Sr.</TableCell>
                <TableCell>Product title</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Item price</TableCell>
              </TableRow>
            </TableHead>

            {/* Body */}
            <TableBody>
              {item.order_items?.map((item, index) => (
                <TableRow key={item.product.product_code}>
                  {/* Product */}
                  <TableCell>{index + 1}</TableCell>

                  {/* Date */}
                  <TableCell>{item.product.name}</TableCell>

                  {/* Status */}
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{currencyFormatter(item.price)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Summary Box */}
        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Sub Total:</Typography>
            <Typography variant="body1">
              {currencyFormatter(item.sub_amount)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Tax:</Typography>
            <Typography variant="body1">
              {currencyFormatter(item.tax)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Discount:</Typography>
            <Typography variant="body1">
              {currencyFormatter(item.discount_amount)}
            </Typography>
          </Box>

          <Box sx={{ my: 1, borderBottom: 1, borderColor: "divider" }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight="bold">
              Total:
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {currencyFormatter(item.total_amount)}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </AnimatedDialog>
  );
};
