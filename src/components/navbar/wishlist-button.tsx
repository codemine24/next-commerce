import { HeartIcon } from "@/icons/heart-icon";
import { Badge } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const WishlistButton = () => {
  return (
    <>
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
            <HeartIcon />
          </Badge>
        }
        sx={{
          px: 2,
          height: "100%",
          minHeight: 0,
          color: "text.primary",
        }}
      >
        <Typography variant="body2" className="ml-2">
          Wishlist
        </Typography>
      </Button>
    </>
  );
};
