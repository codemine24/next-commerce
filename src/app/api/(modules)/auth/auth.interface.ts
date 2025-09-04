export interface UserPayload {
  first_name: string;
  last_name?: string;
  email: string;
  contact_number?: string;
  password: string;
}

export interface CredentialPayload {
  email: string;
  password: string;
}
