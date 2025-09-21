// MUI
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { PropsWithChildren } from "react";

// STYLED COMPONENT
const Wrapper = styled("div")(({ theme }) => ({
    height: "100%",
    width: "inherit",
    position: "fixed",
    overflow: "hidden",
    zIndex: theme.zIndex.drawer + 3,
    color: "text.primary",
    backgroundColor: "background.default",
}));

interface LayoutDrawerProps extends PropsWithChildren {
    open: boolean;
    onClose: () => void;
    drawerWidth?: number;
}

export const LayoutDrawer = (props: LayoutDrawerProps) => {
    const { children, open, onClose, drawerWidth = 280 } = props || {};

    return (
        <Drawer
            open={open}
            anchor="left"
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: {
                        width: drawerWidth
                    }
                }
            }}>
            <Wrapper>{children}</Wrapper>
        </Drawer>
    );
}