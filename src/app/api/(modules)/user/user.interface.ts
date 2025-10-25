import { Document, Types } from "mongoose";

import { UserRole, UserStatus } from "./user.constant";

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export interface User extends Document {
  first_name: string;
  last_name?: string | null;
  email: string;
  contact_number?: string | null;
  password?: string;
  avatar?: string | null;
  role: UserRole;
  status: UserStatus;
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
