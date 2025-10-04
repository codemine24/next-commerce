export interface WishlistProduct {
  id: string | number;
  name: string;
  image: string;
  price: number;
  status: "in-stock" | "out-of-stock" | "upcoming";
}
