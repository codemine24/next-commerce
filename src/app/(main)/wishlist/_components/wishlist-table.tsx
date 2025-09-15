import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  Box,
  alpha,
} from "@mui/material";

import { AccessTimeIcon } from "@/icons/access-time";
import { CheckCircle } from "@/icons/check-circle";
import { ShoppingCart } from "@/icons/shopping-cart";
import { BORDER_RADIUS } from "@/theme";
import { DeleteCircle } from "@/icons/delete-circle";

type Product = {
  id: string | number;
  name: string;
  image: string;
  price: number;
  status: "in-stock" | "out-of-stock" | "upcoming";
};

interface WishlistTableProps {
  products: Product[];
}

const WishlistTable: React.FC<WishlistTableProps> = ({ products }) => {
  const renderStatusChip = (status: Product["status"]) => {
    switch (status) {
      case "in-stock":
        return (
          <Chip
            icon={<CheckCircle sx={{}} />}
            label="In Stock"
            variant="outlined"
            sx={{
              color: "primary.main",
              bgcolor: alpha("#3ECDA6", 0.1),
              border: "1px solid #99FFDF",
              borderRadius: BORDER_RADIUS.default,
              "& .MuiChip-icon": {
                color: "primary.main",
              },
            }}
          />
        );
      case "out-of-stock":
        return (
          <Chip
            icon={<DeleteCircle />}
            label="Out of Stock"
            variant="outlined"
            sx={{
              color: "#FF3030",
              bgcolor: alpha("#FF3030", 0.1),
              border: "1px solid #FF3030",
              borderRadius: BORDER_RADIUS.default,
              "& .MuiChip-icon": {
                color: "#FF3030",
              },
            }}
          />
        );
      case "upcoming":
        return (
          <Chip
            icon={<AccessTimeIcon />}
            label="Upcoming"
            variant="outlined"
            sx={{
              color: "#00ADCC",
              bgcolor: alpha("#00ADCC", 0.1),
              border: "1px solid #00ADCC",
              borderRadius: BORDER_RADIUS.default,
              "& .MuiChip-icon": {
                color: "#00ADCC",
              },
            }}
          />
        );
    }
  };

  return (
    <TableContainer
      sx={{
        mt: 2,
        border: "1px solid #EFEDFA",
        borderRadius: BORDER_RADIUS.default,
      }}
    >
      <Table
        sx={{
          "& .MuiTableHead-root": {
            fontSize: 10,
          },
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              "& .MuiTableCell-root": {
                borderBottom: "1px solid #EFEDFA",
                fontSize: 16,
                fontWeight: "400",
              },
            }}
          >
            <TableCell sx={{ borderBottom: "1px solid #EFEDFA" }}>
              Product
            </TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{
                "& .MuiTableCell-root": {
                  borderBottom: "1px solid #EFEDFA",
                  fontSize: "16px",
                  fontWeight: 500,
                  py: 1,
                },
              }}
            >
              {/* Product cell */}
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                    }}
                  />
                  {product.name}
                </Box>
              </TableCell>

              {/* Price cell */}
              <TableCell>${product.price}</TableCell>

              {/* Stock Status cell */}
              <TableCell>{renderStatusChip(product.status)}</TableCell>

              {/* Action cell */}
              <TableCell>
                <Box display="flex" alignItems="center" gap={3}>
                  <Button
                    size="medium"
                    startIcon={<ShoppingCart />}
                    sx={{
                      py: 1.5,
                      borderRadius: BORDER_RADIUS.default,
                      bgcolor: "#F7FCFB",
                      color: "text.primary",
                      "&:hover": {
                        bgcolor: "#E6F2EE",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    sx={{
                      bgcolor: "#F7FCFB",
                      borderRadius: BORDER_RADIUS.default,
                      border: "1px solid #E6F2EE",
                      "&:hover": {
                        color: "#FF3030",
                        bgcolor: alpha("#FF3030", 0.1),
                      },
                    }}
                  >
                    <DeleteCircle />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WishlistTable;
