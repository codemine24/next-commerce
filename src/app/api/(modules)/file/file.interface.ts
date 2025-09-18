export type UpdateFilePayload = {
  name?: string;
  alt_text?: string;
};

export type DeleteFilePayload = {
  files_path: string[];
};
