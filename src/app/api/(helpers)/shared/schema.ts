import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

type PhoneOptions = {
  required?: boolean;
  allowEmpty?: boolean;
};

// Phone number validation schema
type PhoneOptionsRequired = { required: true; allowEmpty?: boolean };
type PhoneOptionsOptional = { required?: false; allowEmpty?: boolean };

export function phoneSchema(options: PhoneOptionsRequired): z.ZodString;
export function phoneSchema(
  options?: PhoneOptionsOptional
): z.ZodOptional<z.ZodString>;
export function phoneSchema(options: PhoneOptions = {}) {
  const base = z
    .string({ error: "Contact number should be a text" })
    .trim()
    .refine(
      (value) => {
        if (!options.required && !value) return true;

        const phone = parsePhoneNumberFromString(value);
        return phone?.isValid();
      },
      {
        message: "Invalid phone number",
      }
    );

  if (!options.required) {
    return base.optional();
  }

  return base;
}

// Delete records validation schema
const deleteRecordsValidationSchema = z.object({
  body: z
    .object({
      ids: z
        .array(
          z.uuid({
            error: "ID should be a valid uuid",
          })
        )
        .min(1, "At least one ID is required"),
    })
    .strict(),
});

export const commonSchemas = {
  deleteRecordsValidationSchema,
  phoneSchema,
};
