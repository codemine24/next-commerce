import { BoxContainer } from "@/components/box-container";
import Wishlist from "./_components/wishlist";
import EmptyWishlist from "./_components/empty-wishlist";
import { wishlistData } from "./_components/wishlistData";

const wishlistPage = () => {
  const hasProducts = wishlistData.length > 0;
  return (
    <BoxContainer>
      {hasProducts ? <Wishlist /> : <EmptyWishlist />}
    </BoxContainer>
  );
};

export default wishlistPage;
