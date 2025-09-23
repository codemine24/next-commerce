import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { WishListTable } from "./_components/wish-list-table";

export default function WishListPage() {
    return (
        <Box>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Wishlist
            </Typography>

            <WishListTable />
        </Box>
    );
}