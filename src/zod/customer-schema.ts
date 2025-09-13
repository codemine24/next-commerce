import { z } from "zod";

export const customerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  mobile: z.string().regex(/^\d{10,15}$/, "Enter a valid mobile number"),
  email: z.email("Enter a valid email"),
  upazilla: z.string().min(1, "Upazilla / Thana is required"),
  district: z.string().min(1, "Please select a district"),
  comment: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
