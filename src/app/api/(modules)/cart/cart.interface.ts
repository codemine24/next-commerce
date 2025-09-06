export interface AddToCartPayload {
  product_id: string;
  quantity?: number;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  price: number;
}
