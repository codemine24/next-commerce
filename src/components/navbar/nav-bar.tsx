import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import { BoxContainer } from "../box-container";
import { CartButton } from "./cart-button";
import { CategoriesButton } from "./categories-button";
import { Logo } from "./logo";
import { SearchBox } from "./search-box";
import { UserButton } from "./user-button";
import { WishlistButton } from "./wishlist-button";

export const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        py: "10px !important",
        bgcolor: "#fff",
        color: "#000",
        
      }}
    >
      <BoxContainer sx={{ height: "100%" }}>
        <Box  display="flex" alignItems="center">
          <Logo />
          <SearchBox />
          <WishlistButton />
          <CartButton />
          <CategoriesButton />
          <UserButton />
        </Box>
      </BoxContainer>
    </AppBar>
  );
};
