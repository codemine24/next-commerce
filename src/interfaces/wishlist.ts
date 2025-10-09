import { Product } from "./product";


export interface Wishlist {
  created_at: string;
  id: string;
  product: Product;
  product_id: string;
  user_id: string;
}

export interface WishlistProduct {
  id: string | number;
  name: string;
  image: string;
  price: number;
  status: "in-stock" | "out-of-stock" | "upcoming";
}
