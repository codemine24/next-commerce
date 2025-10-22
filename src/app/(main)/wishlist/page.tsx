import { getWishlist } from "@/actions/wishlist";
import { BoxContainer } from "@/components/box-container";

import EmptyWishlist from "./_components/empty-wishlist";
import Wishlist from "./_components/wishlist-content";

const wishlistPage = async () => {
  const data = await getWishlist();

  const hasProducts = data?.data?.length > 0;
 

  return (
    <BoxContainer>
      {hasProducts ? <Wishlist wishList={data.data} /> : <EmptyWishlist />}
    </BoxContainer>
  );
};

export default wishlistPage;