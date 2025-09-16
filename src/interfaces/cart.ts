export type Cart = {
  id: string;
  cart_items: CartItem[];
  cart_total: number;
};

export type CartItem = {
  id: string;
  product: CartProduct;
  quantity: number;
  billing_price: number;
  total: number;
};

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  slug: string;
  thumbnail: string | undefined;
};
