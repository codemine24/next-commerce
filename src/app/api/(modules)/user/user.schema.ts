import z from "zod";

const updateProfile = z.object({
  body: z
    .object({
      first_name: z
        .string({ error: "First name should be a text" })
        .min(1, "First name is required")
        .optional(),
      last_name: z
        .string({ error: "Last name should be a text" })
        .optional()
        .nullable(),
      contact_number: z
        .string({ error: "Contact number should be a text" })
        .optional()
        .nullable(),
    })
    .strict(),
});

export const UserSchemas = {
  updateProfile,
};
