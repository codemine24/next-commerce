export interface Review {
  id: string;
  comment: string;
  created_at: string;
  product: { name: string };
  rating: number;
  updated_at: string;
  user: {
    contact_number: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  date: string;
}
