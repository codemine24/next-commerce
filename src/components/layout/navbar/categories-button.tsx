import Button from "@mui/material/Button";
import { StackIcon } from "@/icons/stack";
import Typography from "@mui/material/Typography";

export const CategoriesButton = () => {
    return (
        <Button
            startIcon={<StackIcon />}
            sx={{
                px: 3,
                height: "100%",
                minHeight: 0,
                borderRadius: 0,
                borderRight: "1px solid",
                borderColor: "divider"
            }}
        >
            <Typography variant="body2">Categories</Typography>
        </Button>
    )
}