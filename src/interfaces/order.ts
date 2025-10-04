export interface IOrder {
  id: string;
  order_id: string;
  payment_type: string;
  delivery_method: string;
  delivery_charge: number;
  discount_amount: number;
  sub_amount: number;
  total_amount: number;
  tax: number;
  percentage_of_tax: number;
  payment_status: string;
  order_status: string;
  comment: string;
  created_at: string;
  updated_at: string;
  order_items: IOrderItem[];
  history: IOrderHistory[];
}

export interface IOrderItem {
  product: {
    name: string;
    thumbnail: string;
    product_code: string;
    warranty: string;
  };
  quantity: number;
  price: number;
}

export interface IOrderHistory {
  id: string;
  order_id: string;
  status: string;
  remark: string;
  created_at: string;
}
