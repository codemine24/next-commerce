import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import { BoxContainer } from "../box-container";
import { Logo } from "../logo";
import { LogoBlack } from "../logo-black";

import { CartButton } from "./cart-button";
import { CategoriesButton } from "./categories-button";
import { SearchBox } from "./search-box";
import { UserButton } from "./user-button";
import { WishlistButton } from "./wishlist-button";

export const Navbar = () => {
  console.log("Navbar");
  
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        py: "10px !important",
        bgcolor: "background.default",
        color: "text.primary",
        borderBottom: "none",
      }}
    >
      <BoxContainer sx={{ height: "100%" }}>
        <Box display="flex" alignItems="center">
          <LogoBlack />
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
