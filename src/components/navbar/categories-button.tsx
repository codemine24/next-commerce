import { ArrowDownIcon } from "@/icons/arrow-down-icon";
import { GridIcon } from "@/icons/grid-icon";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const CategoriesButton = () => {
  return (
    <Button
      startIcon={<GridIcon />}
      endIcon={<ArrowDownIcon />}
      sx={{
        px: 2,
        height: "100%",
        minHeight: 0,
        borderRadius: 0,
        borderRight: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Typography variant="body2">Categories</Typography>
    </Button>
  );
};
