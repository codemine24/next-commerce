import { Document, Types } from "mongoose";

export interface User extends Document {
  first_name: string;
  last_name?: string | null;
  email: string;
  contact_number?: string | null;
  password?: string;
  avatar?: string | null;
  role: "CUSTOMER" | "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  is_deleted?: boolean;
  password_changed_at?: Date | null;

  // Relationships
  files: Types.ObjectId[];
  cart?: Types.ObjectId | null;
  addresses: Types.ObjectId[];
  orders: Types.ObjectId[];
  reviews: Types.ObjectId[];
  order_histories: Types.ObjectId[];
  wishlist: Types.ObjectId[];
  QnA: Types.ObjectId[];
  blogs: Types.ObjectId[];

  // Timestamps
  created_at: Date;
  updated_at: Date;
}

export interface UpdateUserPayload {
  data: any;
  avatar?: File;
}
