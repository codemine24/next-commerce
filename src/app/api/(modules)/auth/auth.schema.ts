import z from "zod";

const registerUser = z.object({
  body: z
    .object({
      first_name: z
        .string({ error: "First name is required" })
        .min(1, "First name is required"),
      last_name: z.string().optional().nullable(),
      email: z.email({ error: "Enter a valid email" }),
      contact_number: z.string().optional().nullable(),
      password: z.string({ error: "Password is required" }),
    })
    .strict(),
});

const login = z.object({
  body: z
    .object({
      email: z.email({ error: "Enter a valid email" }),
      password: z.string({ error: "Password is required" }),
    })
    .strict(),
});

export const AuthSchemas = {
  registerUser,
  login,
};
