export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string;
  images: string[];
  tags: string[];
  author_id: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  author: {
    id: string;
    first_name: string;
    last_name?: string;
    email: string;
    contact_number?: string;
    avatar?: string;
  };
}
