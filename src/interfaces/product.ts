import { Category } from "./category";

export interface Product {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  discount_price: number;
  model: string;
  brand_id: string;
  size: string;
  color: string;
  tags: string[];
  product_code: string;
  warranty: string;
  stock: number;
  gallery: string[];
  description: string;
  specification: string;
  additional_information: string;
  key_features: string[];
  video_url: string | undefined;
  categories: Category[];
}
