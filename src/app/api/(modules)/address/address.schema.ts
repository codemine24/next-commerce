import { z } from "zod";

import { commonSchemas } from "../../(helpers)/shared/schema";

export const createAddress = z.object({
  name: z
    .string({
      error: "Name is required",
    })
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must not exceed 100 characters"),
  contact_number: commonSchemas.phoneSchema({
    required: true,
    allowEmpty: false,
  }),
  secondary_contact_number: commonSchemas.phoneSchema({
    required: false,
    allowEmpty: true,
  }),
  email: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Invalid email"
    ),
  address: z
    .string({
      error: "Address is required",
    })
    .min(5, "Address must be at least 5 characters long"),
  postal_code: z
    .string({
      error: "Postal code must be a string",
    })
    .length(4, "Postal code must be 4 characters long")
    .optional()
    .nullable(),
  city: z
    .string({
      error: "City is required",
    })
    .min(2, "City must be at least 2 characters long"),
  district: z
    .string({
      error: "District is required",
    })
    .min(4, "District must be at least 2 characters long"),
  country: z
    .string({
      error: "Country must be a string",
    })
    .default("bangladesh"),
  is_default: z
    .boolean({ error: "Is default must be a boolean" })
    .default(false),
});

export const updateAddressValidationSchema = z.object({
  body: z
    .object({
      name: z
        .string({
          error: "Name is required",
        })
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name must not exceed 100 characters")
        .optional(),
      contact_number: commonSchemas.phoneSchema({
        required: false,
        allowEmpty: true,
      }),
      secondary_contact_number: commonSchemas.phoneSchema({
        required: false,
        allowEmpty: true,
      }),
      email: z
        .string({
          error: "Invalid email",
        })
        .email({ message: "Invalid email" })
        .optional()
        .nullable(),
      address: z
        .string({
          error: "Address is required",
        })
        .min(5, "Address must be at least 5 characters long")
        .optional(),
      postal_code: z
        .string({
          error: "Postal code must be a string",
        })
        .length(4, "Postal code must be 4 characters long")
        .optional()
        .nullable(),
      city: z
        .string({
          error: "City is required",
        })
        .min(2, "City must be at least 2 characters long")
        .optional(),
      district: z
        .string({
          error: "District is required",
        })
        .min(4, "District must be at least 2 characters long")
        .optional(),
      country: z
        .string({
          error: "Country must be a string",
        })
        .default("bangladesh")
        .optional(),
      is_default: z
        .boolean({ error: "Is default must be a boolean" })
        .default(false),
    })
    .strict(),
});

export const AddressValidations = {
  createAddress,
  updateAddressValidationSchema,
};
