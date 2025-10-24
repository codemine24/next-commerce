import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import { getCategories } from "@/actions/category";

import { BoxContainer } from "../box-container";
import { LogoBlack } from "../logo-black";

import { CartButton } from "./cart-button";
import { CategoriesButton } from "./categories-button";
import { SearchBox } from "./search-box";
import { UserButton } from "./user-button";
import { WishlistButton } from "./wishlist-button";

export const Navbar = async () => {
  const data = await getCategories();

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
          <CategoriesButton categories={data.data} />
          <UserButton />
        </Box>
      </BoxContainer>
    </AppBar>
  );
};