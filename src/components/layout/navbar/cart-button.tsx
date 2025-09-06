import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CartIcon } from "@/icons/cart";
import Badge from "@mui/material/Badge";

export const CartButton = () => {
    return (
        <Button
            startIcon={
                <Badge
                    color="primary"
                    showZero
                    badgeContent={0}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <CartIcon />
                </Badge>
            }
            sx={{
                px: 3,
                height: "100%",
                minHeight: 0,
                borderRadius: 0,
                borderRight: "1px solid",
                borderColor: "divider"
            }}
        >
            <Typography variant="body2">Cart</Typography>
        </Button>
    )
}