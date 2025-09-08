import { CartIcon } from "@/icons/cart-icon";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const CartButton = () => {
  return (
    <Button
      startIcon={
        <Badge
          color="primary"
          showZero
          badgeContent={0}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <CartIcon />
        </Badge>
      }
      sx={{
        px: 2,
        height: "100%",
        minHeight: 0,
        borderRadius: 0,
        color: "text.primary",
      }}
    >
      <Typography variant="body2" sx={{ color: "text.primary" }}>Cart</Typography>
    </Button>
  );
};
