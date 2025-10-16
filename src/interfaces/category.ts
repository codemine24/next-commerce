export interface Category {
  id: string;
  title: string;
  slug: string;
  icon: string;
  featured: boolean;
  description: string;
  parent: Category | null;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}
