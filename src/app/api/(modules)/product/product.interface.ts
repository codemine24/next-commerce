export interface ProductPayload {
  name: string;
  slug: string;
  model?: string;
  brand_id?: string;
  categories?: string[];
  size?: string;
  color?: string;
  tags?: string[];
  product_code?: string;
  warranty?: string;
  stock?: number;
  price: number;
  discount_price?: number;
  thumbnail?: string;
  gallery?: string[];
  description?: string;
  specification?: string;
  additional_information?: string;
  key_features?: string[];
  video_url?: string;
  is_hot_deal?: boolean;
  is_banner_product?: boolean;
}
