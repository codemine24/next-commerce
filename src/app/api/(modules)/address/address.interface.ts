export interface AddressPayload {
  name: string;
  contact_number: string;
  secondary_contact_number?: string;
  email?: string;
  address: string;
  postal_code?: string;
  city: string;
  district: string;
  country?: string;
  is_default?: boolean;
}
