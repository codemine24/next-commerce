import z from "zod";

const registerUser = z.object({
  body: z.object({
    first_name: z
      .string({ error: "First name is required" })
      .min(1, "First name is required"),
    last_name: z.string().optional(),
    email: z.email({ error: "Enter a valid email" }),
    contact_number: z.string().optional(),
    password: z.string({ error: "Password is required" }),
  }),
});

export const AuthSchemas = {
  registerUser,
};
