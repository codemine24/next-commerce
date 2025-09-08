import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string({ error: "Password is required" })
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be at most 32 characters"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
