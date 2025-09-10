import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { NavItem } from "./user-nav-item";
import { USER_NAVIGATION } from "./user-navigation";
import { LogoutButton } from "./logout-button";

export const UserSidebar = () => {
    return (
        <Box
            width={250}
            py={3}
            border={1}
            borderColor="divider"
        >
            <Box display="flex" flexDirection="column" gap={4}>
                {USER_NAVIGATION.map(nav_items => (
                    <Box key={nav_items.title}>
                        <Typography variant="body2" fontSize={12} fontWeight={700} pl={3.5}>{nav_items.title}</Typography>
                        <Box mt={1}>
                            {nav_items.list.map(list_item => <NavItem key={list_item.name} item={list_item} />)}
                        </Box>
                    </Box>
                ))}
                <LogoutButton />
            </Box>
        </Box>
    )
}