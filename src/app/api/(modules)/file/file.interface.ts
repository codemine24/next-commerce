import { Document } from "mongoose";

export interface File extends Document {
  user_id?: string | null;
  name: string;
  alt_text: string;
  type: string;
  size: number;
  width: number;
  height: number;
  path: string;
  bucket_id: string;
  bucket_name: string;
  created_at?: Date;
  updated_at?: Date;
}

export type UpdateFilePayload = {
  name?: string;
  alt_text?: string;
};

export type DeleteFilePayload = {
  files_path: string[];
};
