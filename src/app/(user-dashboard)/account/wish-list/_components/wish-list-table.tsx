import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { OptimizeImage } from "@/components/optimize-image";
import { CartIcon } from "@/icons/cart-icon";
import { VisibilityIcon } from "@/icons/visibility";

const wishlists = [
    {
        id: "1",
        product: {
            name: "Product 1",
            model: "Model 1",
            thumbnail: "thumbnail 1",
            stock: 10,
            discount_price: 100,
        },
    }
]


export const WishListTable = async () => {
    return (
        <TableContainer component={Box}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {wishlists?.map((item: any) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <OptimizeImage
                                    src="https://placehold.co/600x400/png"
                                    alt="Product Image"
                                    height={80}
                                    width={80}
                                    imageStyle={{ objectFit: 'contain' }}
                                />
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">{item.product.name}</Typography>
                                {item.product.model && (
                                    <Typography variant="caption" color="text.secondary">
                                        Model: {item.product.model}
                                    </Typography>
                                )}
                            </TableCell>
                            <TableCell>
                                <Chip label="In Stock" color="primary" size="small" />
                            </TableCell>
                            <TableCell>৳ {item.product.discount_price?.toLocaleString('en-BD')}</TableCell>
                            <TableCell>
                                <Stack direction="column" spacing={1}>
                                    <Button LinkComponent={Link} href={`/${item.product.slug}`} variant="outlined" size="small" startIcon={<VisibilityIcon />}>
                                        View
                                    </Button>
                                    <Button variant="outlined" size="small" startIcon={<CartIcon />}>
                                        Add to Cart
                                    </Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};