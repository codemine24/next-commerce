import { z } from "zod";

export const addressSchema = z.object({
    name: z
        .string({ error: "Name is required" })
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name must not exceed 100 characters"),
    contact_number: z.string({ error: "Contact number is required" }),
    secondary_contact_number: z.string().optional().nullable(),
    email: z
        .string({ error: "Email should be a valid email" })
        .refine(
            (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
            "Invalid email"
        ),
    address: z
        .string({ error: "Address is required" })
        .min(5, "Address must be at least 5 characters long"),
    postal_code: z.
        string()
        .optional()
        .refine(val => !val || val.length === 4, {
            message: 'Postal code must be 4 digits',
        }),
    city: z
        .string({ error: "City is required" })
        .min(2, "City must be at least 2 characters long"),
    district: z
        .string({ error: "District is required" })
        .min(4, "District must be at least 2 characters long"),
    country: z
        .string({ error: "Country must be a string" })
        .min(3, "Country must be at least 3 characters long"),
    is_default: z
        .boolean({ error: "Is default must be a boolean" })
        .optional()
});

export type AddressSchema = z.infer<typeof addressSchema>;
