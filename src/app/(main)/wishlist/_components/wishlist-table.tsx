"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Wishlist } from "@/interfaces/wishlist";

import WishlistTableRow from "./wishlist-table-row";

interface WishlistTableProps {
  wishList: Wishlist[];
}

export const WishlistTable = ({ wishList }: WishlistTableProps) => {
  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {wishList.map((item) => (
            <WishlistTableRow key={item.id} item={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};