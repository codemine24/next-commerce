export interface Qna {
  id: string;
  inquirer_id: string;
  product_id: string;
  question: string;
  answer: string | null;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  inquirer: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};
