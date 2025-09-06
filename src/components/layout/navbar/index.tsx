import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { BoxContainer } from "../box-container";
import { Logo } from "./logo";
import Box from "@mui/material/Box";
import { SearchBox } from "./search-box";
import { WishlistButton } from "./wishlist-button";
import { CartButton } from "./cart-button";
import { CategoriesButton } from "./categories-button";
import { UserButton } from "./user-button";

export const Navbar = () => {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                py: "0px !important",
                bgcolor: "#fff",
                color: "#000",
                borderBottom: "1px solid",
                borderColor: "divider"
            }}>
            <BoxContainer sx={{ height: "100%" }}>
                <Box
                    height={45}
                    display="flex"
                    alignItems="center"
                >
                    <Logo />
                    <SearchBox />
                    <WishlistButton />
                    <CartButton />
                    <CategoriesButton />
                    <UserButton />
                </Box>
            </BoxContainer>

        </AppBar>
    )
}
