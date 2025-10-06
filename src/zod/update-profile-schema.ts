import { z } from "zod";

export const updateProfileSchema = z
  .object({
    avatar: z
      .instanceof(File, { message: "Avatar must be a file" })
      .optional()
      .or(z.string()),

    first_name: z
      .string({ error: "First name should be text" })
      .min(1, "First name is required")
      .optional(),

    last_name: z
      .string({ error: "Last name should be text" })
      .optional()
      .nullable(),

    contact_number: z
      .string({ error: "Contact number should be text" })
      .optional()
      .nullable(),
  })
  .strict();

export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>;
