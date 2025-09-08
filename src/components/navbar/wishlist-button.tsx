import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { WishListIcon } from "@/icons/wish-list";

export const WishlistButton = () => {
    return (
        <Button
            startIcon={<WishListIcon />}
            sx={{
                px: 3,
                height: "100%",
                minHeight: 0,
                borderRadius: 0,
                borderRight: "1px solid",
                borderColor: "divider"
            }}
        >
            <Typography variant="body2">Wishlist</Typography>
        </Button>
    )
}