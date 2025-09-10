import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { NavItem } from "./user-nav-item";
import { USER_NAVIGATION } from "./user-navigation";

export const UserSidebar = () => {
    return (
        <Grid
            size={{ xs: 12, md: 3 }}
            sx={{
                py: 3,
                border: 1,
                borderColor: "divider",
            }}
        >
            <Box display="flex" flexDirection="column" gap={3}>
                {USER_NAVIGATION.map(nav_items => (
                    <Box key={nav_items.title}>
                        <Typography variant="body2" fontSize={12} fontWeight={600} pl={3.5}>{nav_items.title}</Typography>
                        <Box mt={1}>
                            {nav_items.list.map(list_item => <NavItem key={list_item.name} item={list_item} />)}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Grid>
    )
}